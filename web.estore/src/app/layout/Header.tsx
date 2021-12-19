import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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

function Header({darkMode, handelThemeChange} : Props) {
    return (
       <AppBar position="static" sx={{mb: 4}}>
           <Toolbar>
               <Typography variant="h6" component={NavLink} to='/' sx={{color:'inherit', textDecoration:'none'}}>
                    E-Store
               </Typography>
               <Switch checked={darkMode} onChange={handelThemeChange} />
               <List sx={{display:'flex'}}>
                   {midLinks.map(({title, path})=> (
                       <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color: 'inherit', typography:'h6'}}
                            >
                           {title.toLocaleUpperCase()}
                       </ListItem>
                   ))}
               </List>
               <IconButton sx={{color:'inherit'}} size="large">
                   <Badge badgeContent={4} color='secondary'>
                       <ShoppingCart  />
                   </Badge>
               </IconButton>
               <List sx={{display:'flex'}}>
                   {rightLinks.map(({title, path})=> (
                       <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color: 'inherit', typography:'h6'}}
                            >
                           {title.toLocaleUpperCase()}
                       </ListItem>
                   ))}
               </List>
           </Toolbar>
       </AppBar>
    );
}

export default Header;