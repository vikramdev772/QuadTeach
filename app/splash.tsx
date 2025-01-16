import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Splash: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/netflix.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
