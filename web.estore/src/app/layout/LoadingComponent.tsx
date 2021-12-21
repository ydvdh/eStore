import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

type Props = {
    message?: string;
}

function LoadingComponent({message ='Loading...'}: Props) {
    return(
      <Backdrop open={true} invisible={true}>
          <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
             <CircularProgress
            size={100}
            sx={{
              color: 'secondary',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}></CircularProgress>
            <Typography variant="h4" sx={{justifyContent:'center', position:'fixed', top:'60%'}}>{message}</Typography>
          </Box>
      </Backdrop>
    )
}

export default LoadingComponent;