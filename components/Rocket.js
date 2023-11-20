// Rocket.js
import Matter from "matter-js";
import React from 'react'
import { View, ImageBackground, Image } from 'react-native';
import rocketPicture from '../images/rocket.png'

const Rocket = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    const color = props.color;

    return (
        <ImageBackground
            source={rocketPicture}
            style={{
                // borderWidth: 1,
                // borderColor: color,
                borderStyle: 'solid',
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }}
        >
        </ImageBackground>
    )
}

export default (world, label, color, pos, size) => {
    const initialRocket = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic:true
        }
    ) 
    Matter.World.add(world, initialRocket)

    return {
        body: initialRocket,
        color,
        pos,
        renderer: <Rocket/>
    }
}
