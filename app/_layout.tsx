import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, StatusBar, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './index';
import SearchScreen from './search';
import SplashScreen from './splash';

const Tab = createBottomTabNavigator();

const CustomHeader = () => (
  <View style={styles.header}>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <Text style={styles.headerTitle}>MovieMaze</Text>
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
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarStyle: {
          backgroundColor: '#141414',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
        },
        header: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: '#141414',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name="home" 
              size={24} 
              color={color}
              style={styles.tabIcon}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name="search" 
              size={24} 
              color={color}
              style={styles.tabIcon}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Search</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#141414',
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: '#E50914',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
});

