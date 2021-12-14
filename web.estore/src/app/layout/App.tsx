import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from '../../features/catalog/Catalog'

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    fetch('https://localhost:44301/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  function addProduct(){
    setProducts(prevState => [...prevState, 
      {
      id: prevState.length+1,
      name: "product" + (prevState.length+1),
      description: "description",
      price: (prevState.length * 100) + 100,
      pictureUrl: "string",
      brand: "Some Brand"
    }])
  }
  return (
    <div>
     <h1>e-Store</h1>
     <Catalog products = {products} addProduct= {addProduct} />
    </div>
  );
}

export default App;
