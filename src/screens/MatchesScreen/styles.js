import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F47C7C',
    marginBottom: 10,
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  user: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 2,
    borderWidth: 3,
    borderColor: '#F47C7C',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default styles;
