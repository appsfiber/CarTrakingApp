/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme, Text } from 'react-native';

import DashboardScreen from './src/screens/DashboardScreen.jsx';
import NotificationScreen from './src/screens/NotificationScreen.jsx';
import SupportScreen from './src/screens/SupportScreen.jsx';
import MapScreen from './src/screens/MapScreen.jsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dashboard Stack Navigator
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}>
          <Tab.Screen
            name="Dashboard"
            component={DashboardStack}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📊</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>🔔</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Support"
            component={SupportScreen}
            options={{
              tabBarLabel: 'Reports',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📄</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
