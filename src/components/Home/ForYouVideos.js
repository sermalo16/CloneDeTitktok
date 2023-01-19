import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Video } from "../../api";
import { useAuth } from "../../hooks";
import { ENV } from "../../utils";
import { VideoFeed } from "../../components/Shared";


const { height } = Dimensions.get("window");
const videoController = new Video();


export function ForYouVideos() {
    const [videos, setVideos] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        if(accessToken){
            (async () => {
                try {
                    const response = await videoController.getAllVideos(accessToken);
                    setVideos(response);
                } catch (error) {
                    console.error(error);
                }
            })()
        }
    }, []);


    if(!videos) return null;


  return (

    <FlatList
    data={videos}
    decelerationRate="fast"
    keyExtractor={(_, index) => index.toString()}
    renderItem={ ({item, index}) => (
      <VideoFeed index={index} item={item}/>
    )}
    removeClippedSubviews={false}
    showsHorizontalScrollIndicator={false}
    snapToInterval={height - ENV.TAB_MENU_HEIGHT}
    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50}}
    onScrollToIndexFailed={() => {}}
    />



  )
}