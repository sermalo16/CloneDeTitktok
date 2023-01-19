import React, {useState} from 'react';
import { Text } from 'react-native-elements';
import { Header, FollowingVideos, ForYouVideos } from "../../components/Home";
import { ENV } from "../../utils";

export function HomeScreen() {

  const [typeVideos, setTypeVideos] = useState(ENV.TYPE_VIDEO.FOR_YOU);

  return (
    <>
      <Header typeVideos={typeVideos} setTypeVideos={setTypeVideos}/>
      {typeVideos === ENV.TYPE_VIDEO.FOR_YOU ? (
        <ForYouVideos/>
      ) : (
        <FollowingVideos/>
      )}
    </>
  );
}