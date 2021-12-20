import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}
function ProductCard({product} : Props) {
    return (
    <>
    <Card>
        <CardHeader 
            avatar={
                <Avatar  sx = {{bgcolor: 'primary.light'}}>
                    {product.name.charAt(0).toLocaleUpperCase()}
                </Avatar>
            }
            title={product.name}
            titleTypographyProps={{
                sx: {fontSize: 'bold', color:'primary.main'}
            }}
        />
        <CardMedia
            sx={{height: 140, backgroundSize: 'contain', bgcolor:'grey.200'}}
            image={product.pictureUrl}
            title={product.name}
        />
        <CardContent>
            <Typography gutterBottom color="secondary" component="div">
                ${(product.price/100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.brand}/{product.type}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Add to Cart</Button>
            <Button size="small"  component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
    </Card>
    </>
    );
}

export default ProductCard;