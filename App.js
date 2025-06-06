import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import PartScreen from './screens/PartScreen';
import QuestionScreen from './screens/QuestionScreen';
import ArticleScreen from './screens/ArticleScreen';
import DrawerMenu from './components/DrawerMenu';

const Stack = createStackNavigator();

export default function App() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const navigationRef = useRef();

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const DrawerButton = ({ navigation }) => (
    <Pressable
      onPress={openDrawer}
      style={{
        marginRight: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <MaterialIcons name="menu" size={24} color="#FFFFFF" />
    </Pressable>
  );

  const DrawerButtonDark = ({ navigation }) => (
    <Pressable
      onPress={openDrawer}
      style={{
        marginRight: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <MaterialIcons name="menu" size={24} color="#000000" />
    </Pressable>
  );

  return (
    <NavigationContainer ref={navigationRef}>
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
          options={({ navigation }) => ({
            title: 'Suma Teológica',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerRight: () => <DrawerButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="PartScreen"
          component={PartScreen}
          options={({ route, navigation }) => ({
            title: `Parte ${route.params.part.id}`,
            headerRight: () => <DrawerButtonDark navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={({ route, navigation }) => ({
            title: `Cuestión ${route.params.question.id}`,
            headerRight: () => <DrawerButtonDark navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ArticleScreen"
          component={ArticleScreen}
          options={({ route, navigation }) => ({
            title: `Artículo ${route.params.article.id}`,
            headerRight: () => <DrawerButtonDark navigation={navigation} />,
          })}
        />
      </Stack.Navigator>

      <DrawerMenu
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        navigation={navigationRef.current}
      />
    </NavigationContainer>
  );
} 