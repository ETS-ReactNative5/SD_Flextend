import React from "react";
import { Image, ImageProps, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import auth from '@react-native-firebase/auth'

interface AvatarProps extends ImageProps {
  onChange?: (image: ImageOrVideo) => void;
}


export const Avatar = (props: AvatarProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);

  // function to pick photo, it sets the photo uri and then saves the uri to the user's profile
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      auth().currentUser.updateProfile({photoURL: uri}).then(console.log("After upload: " + auth().currentUser.photoURL));
      // setUri(image.path);
      setUri(auth().currentUser.photoURL)
      props.onChange?.(image);
      
    });
  };
  return (
    // whatever I pass under Avatar tag on profile picture refers back to here 
    <TouchableOpacity onPress={pickPicture}>
      <Image
        style={styles.avatar}
        {...props}
        // source = {auth().currentUser.photoURL}
        source={uri ? { uri } : props.source}
        // source ={"../images/profile_placeholder.png"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
});