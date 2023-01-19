import React from 'react';
import { View, Pressable,  } from 'react-native';
import { Text } from 'react-native-elements';
import {styles} from "./VideoFeed.style";



export function VideoFeed(props) {

  const {item, index} = props;

  const stratPauseVideo = () => {
    console.log("log....");
  };

  return (
    <Pressable style={styles.content} onPress={stratPauseVideo}>

      {/* reproductor del video */}
      <View style={{backgroundColor: "#f00", height: "100%"}}/>
        

      <View style={styles.blockContent}>
        <View style={styles.blockLeft}>
          <Text>{item.user_data.username}</Text>
          <Text>{item.description}</Text>
        </View>

        <View style={styles.blockRight}>
          <Text>profile</Text>
          <Text>likes</Text>
          <Text>comments</Text>
          <Text>shared</Text>
        </View>
      </View>


      {/* time line */}
    </Pressable>
  )
}