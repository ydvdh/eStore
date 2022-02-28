import Header from '../layout/Header'
import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import  Home  from '../../features/home/Home';
import Catalog from '../../features/catalog/Catalog';
import  About  from '../../features/about/About';
import  Contact  from '../../features/contact/Contact';
import ProductDetails from '../../features/catalog/ProductDetails';
import Buggy from '../../features/buggy/Buggy';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import  ServerError  from '../errors/ServerError';
import  NotFound  from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import {getCookie} from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie('buyerId');
    if(buyerId){
    agent.Basket.get()
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handelThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message='Initializing app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handelThemeChange={handelThemeChange} />
      <Container>
       <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/buggy' component={Buggy} />
        <Route path='/server-error' component={ServerError} />
        <Route path='/basket' component={BasketPage} />
        <Route component={NotFound} />
       </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
