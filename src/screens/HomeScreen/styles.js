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
});

export default styles;
