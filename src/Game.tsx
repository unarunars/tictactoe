import React, { useEffect } from 'react';
import { 
    Button, 
    Heading, 
    Text, 
    Card, 
    CardBody, 
    Box, 
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider,
    useDisclosure,} from '@chakra-ui/react'
import './App.css';
import { getIndex, getRandomIndex } from './utils';

function Game() {
    // State variables using React Hooks
    const [data, setData] = React.useState(["", "", "", "", "", "", "", "", ""]);
    const [updatedData, setUpdatedData] = React.useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = React.useState("X");
    const [winner, setWinner] = React.useState("");
    const [turns, setTurns] = React.useState(0);
    const [index, setIndex] = React.useState(10);
    const [xScore, setXScore] = React.useState(0);
    const [oScore, setOScore] = React.useState(0);
    const [isNewGame, setIsNewGame] = React.useState(false);
    const [modalHeader, setModalHeader] = React.useState("");
    const [modalText, setModalText] = React.useState("");
    const [isTwoPlayer, setIsTwoPlayer] = React.useState(true);

    const { 
        isOpen, onOpen, onClose
     } = useDisclosure()
    
    // useEffect hook to handle game logic on each turn
    useEffect(() => {
        if (isNewGame) {
            setIsNewGame(false);
        }else {
            if (data[index] === "" ) {
                data[index] = player;
                setUpdatedData(data)   
            }
            let iswinner = isWinner(player);
            if (!iswinner) {
                setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
            }
            if (!isTwoPlayer && turns % 2 !== 0 && winner === "" && turns !== 9) {
                setTimeout(computerTurn, 500);      
            }
        }
        
    }, [turns]);

    // Function to handle player's turn
    const turn = (index: number) => {
        if (data[index] ==="" ) {
            setTurns((prevTurns) => prevTurns + 1);   
            setIndex(index);
            setData(updatedData);
        }
        if (!isTwoPlayer && player === "O" && winner === "") {
            console.log(winner)
            computerTurn();
        }
    };

    // Function to simulate computer's turn 
    const computerTurn = () => {
        let bestIndex = getIndex(data);
        let index = bestIndex ? bestIndex : getRandomIndex(data);
        setIndex(index);
        setData(updatedData);   
        setTurns((prevTurns) => prevTurns + 1);
    }

    // Function to handle game finish when there is a winner
    const gameFinished = () => {
        setWinner(player);
        setScores(player);
        setModalHeader("👏👏🥇Congrats!🥇👏👏")
        setModalText(`Winner is ${player} 🤩`)
        onOpen();
        return true;
    }

    // Function to handle a draw game
    const drawGame = () => {
        if (turns === 9 && winner === "") {
            setModalHeader("👎👎BOOO👎👎")
            setModalText("No one won. Try again!")
            onOpen();
        }
    }

    // Function to toggle between 1-player and 2-player modes
    const playerMode = () => {
        newGame();
        setIsTwoPlayer(!isTwoPlayer);
    }

    // Function to check if there is a winner
    const isWinner = (player: string) => {
        // Check all possible winning combinations
        // If there is a winner, call gameFinished function
        // If no winner, check for a draw game
        if (data[0] === data[1] && data[1] === data[2] && data[0] != "") {
            return gameFinished();
        } else if (data[3] === data[4] && data[4] === data[5] && data[3] != "") {
            return gameFinished();
        } else if (data[6] === data[7] && data[7] === data[8] && data[6] != "") {
            return gameFinished();
        } else if (data[0] === data[3] && data[3] === data[6] && data[0] != "") {
            return gameFinished();
        } else if (data[1] === data[4] && data[4] === data[7] && data[1] != "") {
            return gameFinished();
        } else if (data[2] === data[5] && data[5] === data[8] && data[2] != "") {
            return gameFinished();
        } else if (data[0] === data[4] && data[4] === data[8] && data[0] != "") {
            return gameFinished();
        } else if (data[2] === data[4] && data[4] === data[6] && data[2] != "") {
            return gameFinished();
        }else{
            drawGame();
            return false;
        }
    }

    // Function to reset the game state
    const resetState = () => {
        setIsNewGame(true);
        setTurns(0);
        setData(["", "", "", "", "", "", "", "", ""]);
        setUpdatedData(["", "", "", "", "", "", "", "", ""]);
        setPlayer("X");
        setWinner("");
        onClose();
        setModalHeader("");
        setModalText("");
    }

    // Function to start a new game
    const newGame = () => {
        setXScore(0);
        setOScore(0);
        resetState();
    }

    // Function to update scores based on the winner
    const setScores = (player: string) => {
        if (player === "X" && winner === "") {
            setXScore((prevScore) => prevScore + 1);
        }else if (player === "O" && winner === "") {
            setOScore((prevScore) => prevScore + 1);
        }
    }

    // Function to continue the game after a modal is closed
    const continueGame = () => {
        setPlayer(isTwoPlayer ? (winner ? winner : "X") : "X");
        resetState();
    }
   
    // Function to render the game modal
    const gameModal = () => {
        return (
            <Modal isOpen={isOpen} onClose={continueGame}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalHeader}</ModalHeader>
                        <ModalCloseButton />
                    <ModalBody>
                        <Text>{modalText}</Text>
                        <Text>The score is now: </Text>
                        <Text>Player X: {xScore}</Text>
                        <Text>Player O: {oScore}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={continueGame}>
                            Continue
                        </Button>
                        <Button variant='ghost' mr={3} onClick={newGame}>
                            New game
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    // Function to render the game board
    const board = () => {
        return (
            <>
            <Flex dir='row' fontSize={"300%"} >
                <Box w={"150px"} h={"150px"}  borderRight={"5px solid"} borderBottom={"5px solid"} 
                onClick={() => turn(0)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[0]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"}  borderBottom={"5px solid"} alignItems={"center"}
                onClick={() => turn(1)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[1]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"}  borderLeft={"5px solid"} borderBottom={"5px solid"} alignItems={"center"}
                onClick={() => turn(2)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[2]}</Text>
                </Box>
            </Flex>
            <Flex dir='row' fontSize={"300%"}>
                <Box w={"150px"} h={"150px"} borderRight={"5px solid"} 
                onClick={() => turn(3)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[3]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"}
                onClick={() => turn(4)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[4]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"} borderLeft={"5px solid"}
                onClick={() => turn(5)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[5]}</Text>
                </Box>
            </Flex>
            <Flex dir='row' fontSize={"300%"}>
                <Box w={"150px"} h={"150px"}  borderRight={"5px solid"} borderTop={"5px solid"}
                onClick={() => turn(6)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[6]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"} borderTop={"5px solid"} 
                onClick={() => turn(7)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[7]}</Text>
                </Box>
                <Box w={"150px"} h={"150px"}  borderLeft={"5px solid"} borderTop={"5px solid"} 
                onClick={() => turn(8)}>
                    <Text textAlign={"center"} alignItems={"stretch"}>{data[8]}</Text>
                </Box>
            </Flex>
        </>
        )
    }

    // Function to render the score board
    const scoreBoard = () => {
        return(
        <>
            <Box height={"100%"} width={"auto"} >
                <Box mb={"7%"} textAlign={"start"}>
                    {!isTwoPlayer ? (player === "X" ? <Text>Your turn</Text> : <Text>Computers Turn</Text>) : 
                    <Text>Player {player} turn</Text> }
                </Box>
                <Divider />
                <Box h={"35%"} textAlign={"start"} alignItems={"center"} mt={"7%"}>
                    <Heading>Score</Heading>
                    <Text>Player X: {xScore}</Text>
                    <Text>Player O: {oScore}</Text>
                </Box>
                <Divider />
                <Box h={"15%"} textAlign={"start"} alignItems={"center"} mt={"3%"} >
                    {isTwoPlayer ? <Text>Two players mode</Text> : <Text>One player mode</Text>}
                </Box>
                <Divider />
                <Box h={"7%"}>
                    <Button onClick={newGame} m={"7%"}>New game</Button>
                    <Button onClick={playerMode} m={"7%"}>{isTwoPlayer ? "1 player" : "2 players"}</Button>
                </Box>
            </Box>
        </>
        )
    }

    // Render the main component
  return (
    <Box h={"auto"} width={"90%"}>
          <Heading mb={"10%"} fontFamily={'Verdana'}>
            TIC TAC TOE
          </Heading>
          <Flex dir='column' w={"100%"} height={"auto"} alignContent={"center"}>
            <Box w={"60%"} h={"100%"} color={"white"} bg={"#282c34"}>
                <Flex alignSelf={"center"} justifyContent={"center"}>
                    <Box>
                        {board()}
                    </Box>
                </Flex>
            </Box>
            <Card w={"400px"}>
                <CardBody className='ScoreBoard'>
                    {scoreBoard()}
                </CardBody>
            </Card>
        </Flex>
        {gameModal()}
    </Box>

  );
}

export default Game;
