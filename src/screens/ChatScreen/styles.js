import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    marginTop: 50,
    padding: 10,
    gap: 10,
  },
  chatTabContainer: {
    width: '100%',
    height: 100,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fefefe',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  chatTabUserIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
    borderColor: '#F76C6B',
    borderWidth: 2,
  },
  chatTabUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
