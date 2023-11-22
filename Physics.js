import Matter from 'matter-js';
import { getRandomPosRocket } from "./utils/random";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Physics = (entities, { touches, events, time, dispatch }) => {
  let engine = entities.physics.engine;

  events.forEach((e) => {
    if (e.type === 'move_up') {
      Matter.Body.setVelocity(entities.Drone.body, {
        x: 0,
        y: -5,
      });
    } else if (e.type === 'move_down') {
      Matter.Body.setVelocity(entities.Drone.body, {
        x: 0,
        y: 5,
      });
    }
  });

  
  for (let index = 1; index <= 2; index++) {

    // if(entities[`Rocket${index}`].body.bounds.max.x <= 50 && !entities[`Rocket${index}`].point){
    //     entities[`Rocket${index}`].point = true;
    //     dispatch({type: 'new_point'}) 
    // }


    if(entities[`Rocket${index}`].body.bounds.max.x <= 0){
        const pipeSizePos = getRandomPosRocket(windowWidth * 0.9);

        Matter.Body.setPosition(entities[`Rocket${index}`].body, pipeSizePos)
    }

    Matter.Body.translate(entities[`Rocket${index}`].body, {x: -6, y:0})
  }

  // Matter.Body.translate(entities[`Rocket`].body, { x: -8, y: 0 });

  Matter.Engine.update(engine, time.delta);

  // Remove the obstacle-related code
  // Collision logic remains unchanged
  Matter.Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === 'Drone' || collision.bodyB.label === 'Drone') {
        dispatch({ type: 'game_over' });
      }
    });
  });

  return entities;
};

export default Physics;
