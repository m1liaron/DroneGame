// Bird.js
import Matter from "matter-js";
import React from 'react';
import { ImageBackground } from 'react-native';
import bird from '../images/дрон.gif';

const Drone = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <ImageBackground
      source={bird}
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const initialDrone = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { 
      label: 'Drone',
    }
  );

  Matter.World.add(world, initialDrone);

  return {
    body: initialDrone,
    color,
    pos,
    renderer: <Drone />,
  };
};
