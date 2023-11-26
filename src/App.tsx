
import { Box, ChakraProvider } from '@chakra-ui/react'
import './App.css';
import Game from './Game';

function App() {
  return (
      <ChakraProvider>
        <Box height={"100vh"} className='App'>
          <Game/>
        </Box>
    </ChakraProvider>
  );
}

export default App;
