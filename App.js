import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ImageBackground, Image, Linking, Button  } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities'
import Physics from './Physics';
import { useEffect, useState } from 'react';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, [])

  const handleMoveUp = () => {
    if (gameEngine) {
      gameEngine.dispatch({ type: 'move_up' });
    }
  };

  const handleMoveDown = () => {
    if (gameEngine) {
      gameEngine.dispatch({ type: 'move_down' });
    }
  };

  return (
    <ImageBackground
      source={require('./images/gfdgdd.png')} // replace with your image path
      style={{ flex: 1 }}
    >
      <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {setGameEngine(ref)}}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch(e.type){
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
             break;
             case 'new_point':
                setCurrentPoints(currentPoints + 1);
                break;
          }
        }}
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity
              style={{ backgroundColor: 'green', paddingHorizontal: 30, paddingVertical: 10, marginTop: 10 }}
              onPress={handleMoveUp}
            >
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>
                Move Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: 'red', paddingHorizontal: 30, paddingVertical: 10, marginTop: 10 }}
              onPress={handleMoveDown}
            >
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>
                Move Down
              </Text>
            </TouchableOpacity>
        <StatusBar style="auto" hidden={true}/>
      </GameEngine>

      {!running ? 
          <View style={{position:'absolute',backgroundColor:'#F2D7D5', opacity:0.5, height:'100%', width:'100%', display:'flex', justifyContent:'center'}}>
              <TouchableOpacity style={{backgroundColor: 'black', padiingHorizotal: 30, paddingVertical: 10, marginBottom:'10px'}}
                onPress={() => {
                  setCurrentPoints(0);
                  setRunning(true)
                  gameEngine.swap(entities());
                }}
              >

                <Text style={{fontWeight:'bold', color:'white', fontSize: 30, textAlign:'center'}}>
                  START GAME
                </Text>
              </TouchableOpacity>
          </View>  : null
      }
    </View>
    </ImageBackground>
  );
}