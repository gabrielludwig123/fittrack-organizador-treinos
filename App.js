
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreens';
import TreinosScreen from './src/screens/TreinosScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111C2E',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#0B1220',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            title: 'FitTrack',
          }}
        />

        <Stack.Screen
          name="Treinos"
          component={TreinosScreen}
          options={{
            title: 'Meus treinos',
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            title: 'Sobre o FitTrack',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
