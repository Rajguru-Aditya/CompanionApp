import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
    // alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    width: '100%',
    textAlign: 'left',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: '#F47C7C',
    borderWidth: 3,
    padding: 2,
  },
  editImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 0,
    right: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginVertical: 10,
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: '#000',
  },
  picker: {
    marginVertical: 10,
    width: '100%',
    height: 'auto',
    borderColor: '#ccc',
    // backgroundColor: '#222',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  save: {
    width: '100%',
    backgroundColor: '#F47C7C',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signout: {
    width: '100%',
    backgroundColor: '#DC3535',
    padding: 10,
    marginBottom: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
