import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from '../../features/catalog/ProductList'

function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        fetch('https://localhost:44301/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])

    return (
    <>
        <ProductList products= {products} />
    </>
    );
}

export default Catalog;