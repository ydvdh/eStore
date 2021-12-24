import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from '../../app/api/agent'
import LoadingComponent from "../../app/layout/LoadingComponent";

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
      <h1>{basket.buyerId}</h1>
    );
}

export default BasketPage;