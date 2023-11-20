import Matter from "matter-js";
import Drone from "../components/Drone";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import Rocket from "../components/Rocket";

import { Dimensions } from 'react-native';
import { getPipeSizePosPair, getRandomPosRocket } from "../utils/random";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world;

    world.gravity.y = false;

    const rocketPosA = getRandomPosRocket()
    const rocketPosB = getRandomPosRocket(windowWidth * 0.9)
    
    return {
        physics: { engine, world },
        
        Drone: Drone(world, 'green', {x: 60, y:300}, {height: 64, width: 112}),
        
        Rocket1: Rocket(world, 'Rocket1','red', rocketPosA, {height: 64, width: 272}),
        Rocket2: Rocket(world, 'Rocket2','red', rocketPosB, {height: 64, width: 272}),
        
        Floor: Floor(world, 'yellow', {x: windowWidth / 2, y: windowHeight - 80}, {height: 50, width: windowWidth})
    }
}