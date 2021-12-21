import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from '../../app/api/agent'

function Buggy() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.ErrorResponse.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }
    
    return (
        <Container>
        <Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>
        <ButtonGroup fullWidth>
            <Button variant='contained' onClick={() => agent.ErrorResponse.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
            <Button variant='contained' onClick={() => agent.ErrorResponse.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
            <Button variant='contained' onClick={() => agent.ErrorResponse.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
            <Button variant='contained' onClick={() => agent.ErrorResponse.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
            <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
        </ButtonGroup>
        {validationErrors.length > 0 && 
            <Alert severity='error'>
                <AlertTitle>Validation Errors</AlertTitle>
                <List>
                    {validationErrors.map(error => (
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>
        } 
    </Container>
    );
}

export default Buggy;