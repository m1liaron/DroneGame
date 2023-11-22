import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ImageBackground, Image, Linking, Button, FlatList  } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities'
import Physics from './Physics';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
        <View style={{justifyContent: 'center', alignItems: 'center', borderRadius:10}}>
          <View style={{
              width: windowWidth - 100, 
              height: 40, 
              backgroundColor: '#fff', 
              display:'flex', 
              justifyContent:'center',
              flexDirection:'row', 
              alignItems:'center',
              gap:20
              }}>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
              <View style={{width:30, height:30, backgroundColor:'gray', borderRadius:100}}></View>
          </View>
        </View>
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
                    style={{ backgroundColor: 'gray', opacity:0.5, paddingHorizontal: 30, paddingVertical: 10, marginTop: 350, width:50, height:50, borderRadius:100}}
                    onPress={handleMoveUp}
                  >
              </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: 'gray', paddingHorizontal: 30, paddingVertical: 10,width:50, height:50, borderRadius:100 }}
                  onPress={handleMoveDown}
                >
                </TouchableOpacity>
                <View></View>
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