import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

// const userID = auth().currentUser.phoneNumber;

const kneeHealth_get = async () => {
    const kneeData = await firestore()
        .collection('knee health')
        // .doc(userID)
        .get()
        return(kneeData.data())
}

const data = kneeHealth_get()

export default data