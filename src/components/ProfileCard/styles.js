import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
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
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardInner: {
    padding: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  bio: {
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
  },
});

export default styles;
