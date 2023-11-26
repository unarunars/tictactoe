import React from 'react';
import logo from './logo.svg';
import { Box, Button, ChakraProvider, Heading } from '@chakra-ui/react'
import './App.css';
import Game from './Game';

function App() {
  
  const startGame = () => {
    console.log('start game');
  }
  return (
      <ChakraProvider>
        <Box height={"100vh"} className='App'>
          
          <Game/>
        </Box>
    </ChakraProvider>
    
    
  );
}

export default App;
