import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return(
        <Container component={Paper}>
            <Typography variant="h3" gutterBottom>Opps-We couldn't find what you are looking for</Typography>   
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to Catalog</Button>                  
        </Container>
    )
}

export default NotFound;