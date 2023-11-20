import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPipeSizePosPair = (addToPosX = 0) => {
    let yPosTop = -getRandom(300, windowHeight - 100);

    const pipeTop = { pos: { x: windowWidth + addToPosX, y: yPosTop }, size:{height: windowHeight * 2, width: 75}}
    const pipeBottom = { pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop }, size:{height: windowHeight * 2, width: 75}}

    return { pipeTop, pipeBottom }
}

export const getRandomPosRocket = () => {
    const xPos = windowWidth + getRandom(50, 200);
    const yPos = getRandom(50, windowHeight - 50);
  
    // Ensure the rocket is within the visible height of the screen
    const adjustedYPos = Math.min(Math.max(yPos, 50), windowHeight - 50);
  
    return { x: xPos, y: adjustedYPos };
  };