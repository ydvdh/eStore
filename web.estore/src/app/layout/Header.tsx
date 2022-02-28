import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props{
    darkMode: boolean;
    handelThemeChange: () => void;
}

const midLinks = [
    {title: 'catalog', path:'/catalog'},
    {title: 'about', path:'/about'},
    {title: 'contact', path:'/contact'}
]
const rightLinks = [
    {title: 'login', path:'/login'},
    {title: 'register', path:'/register'}
]
const navStyle = {
    color: 'inherit',
    textDecoration:'none',
    typography:'h6',
    '&:hover':{
        color: 'secondary.main'
    },
    '&.active':{
        color: 'text.secondary'
    }
}

function Header({darkMode, handelThemeChange} : Props) {
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0); // here sum is initilized to zero
    return (
       <AppBar position="static" sx={{mb: 4}}>
           <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
               <Box display='flex' alignItems='center'>
                    <Typography variant="h6" exact component={NavLink} to='/' sx={navStyle}>
                            E-Store
                    </Typography>
                    <Switch checked={darkMode} onChange={handelThemeChange} />                  
               </Box>

               <List sx={{display:'flex'}}>
                        {midLinks.map(({title, path})=> (
                            <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyle}
                                    >
                                {title.toLocaleUpperCase()}
                            </ListItem>
                        ))}
                </List>
               
               <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to="/basket" sx={{color:'inherit'}} size="large">
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart  />
                        </Badge>
                    </IconButton>
                    <List sx={{display:'flex'}}>
                        {rightLinks.map(({title, path})=> (
                            <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyle}
                                    >
                                {title.toLocaleUpperCase()}
                            </ListItem>
                        ))}
                    </List>
               </Box>
           </Toolbar>
       </AppBar>
    );
}

export default Header;