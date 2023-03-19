import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: '#ededed',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    paddingBottom: 30,
  },
  icon: {
    padding: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 10,
    padding: 10,
    borderRadius: 20,
  },
  userImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    paddingBottom: 30,
  },
  userImage: {
    padding: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yay: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F76C6B',
  },
  ok: {
    width: '100%',
    backgroundColor: '#F47C7C',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  okText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
