import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, StatusBar, View, StyleSheet } from 'react-native';
import HomeScreen from './index';
import SearchScreen from './search';
import SplashScreen from './splash';

const Tab = createBottomTabNavigator();

const CustomHeader = () => (
  <View style={styles.header}>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
  </View>
);

export default function AppLayout() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e50914',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#333',
          },
          header: () => <CustomHeader />,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 24 }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 24 }}>🔍</Text>
            ),
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 0, // Hide default header but keep status bar
    backgroundColor: '#000',
  },
});
