import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
  userRow: {
    alignItems: "center",
    padding: 15,
    marginTop: 80,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  switchRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkBoxRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  modalView: {
    backgroundColor: 'white'

  },
  textInput: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 45,
    width: 55,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    fontSize: 9,
    // fontFamily: 'arial',
  },
  height_text: {
    paddingLeft: 35
  },
  Title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    textAlign: 'center',
    paddingLeft: 10,
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: '#ff0f90'
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
});