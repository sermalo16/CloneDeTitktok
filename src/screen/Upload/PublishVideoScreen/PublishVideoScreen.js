import React from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from "./PublishVideoScreen.style";
import { VideoData } from "../../../components/PublishVideo";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Video } from "../../../api";
import { screen } from "../../../utils"
import { initialValues, validationSchema } from "./PublishVideoScreen.data";


const video = new Video();

export function PublishVideoScreen(props) {
  const {route: {params}, navigation} = props;
  const {accessToken, auth} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(params.videoUri),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) =>{
      try{
        await video.create(accessToken, formValue, auth.user_id);

        navigation.reset({
          index: 0,
          routes: [{name: screen.home.tab}]
        })
      }catch (error){
        console.error(error);
      }
    },
  });
  //console.log(formik.errors);

  
  return (
    <View style={styles.content}>
      {/*   FORM    */ }
      <VideoData formik={formik}/>


      <View style= {styles.viewSubmit}>
        <Button title="Publicar" onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
      </View>
    </View>
  )
}