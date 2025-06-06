import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import PartScreen from './screens/PartScreen';
import QuestionScreen from './screens/QuestionScreen';
import ArticleScreen from './screens/ArticleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 2,
            shadowOpacity: 0.1,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackTitle: 'Atrás',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Suma Teológica',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="PartScreen"
          component={PartScreen}
          options={({ route }) => ({
            title: `Parte ${route.params.part.id}`,
          })}
        />
        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={({ route }) => ({
            title: `Cuestión ${route.params.question.id}`,
          })}
        />
        <Stack.Screen
          name="ArticleScreen"
          component={ArticleScreen}
          options={({ route }) => ({
            title: `Artículo ${route.params.article.id}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 