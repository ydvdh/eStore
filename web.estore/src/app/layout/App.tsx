import Header from '../layout/Header'
import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useState } from 'react';
import { Route } from 'react-router-dom';
import  Home  from '../../features/home/Home';
import Catalog from '../../features/catalog/Catalog';
import  About  from '../../features/about/About';
import  Contact  from '../../features/contact/Contact';
import ProductDetails from '../../features/catalog/ProductDetails';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handelThemeChange={handelThemeChange} />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
