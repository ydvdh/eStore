import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from '../../app/api/agent'
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Delete } from "@mui/icons-material";

function BasketPage() {
    const [basket, setBasket] = useState<Basket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        agent.Basket.get()
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return <LoadingComponent message="Loading basket..." />

    if(!basket) return <Typography variant="h2">Your basket is empty.</Typography>

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item=> (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">${(item.price/100).toFixed(2)}.</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default BasketPage;