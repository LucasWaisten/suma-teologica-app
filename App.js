import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'react-native-drawer-layout';

import HomeScreen from './screens/HomeScreen';
import PartScreen from './screens/PartScreen';
import QuestionScreen from './screens/QuestionScreen';
import ArticleScreen from './screens/ArticleScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

const Stack = createStackNavigator();

// Drawer Button Components
function DrawerButton({ color = "#FFFFFF", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginRight: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: color === "#FFFFFF" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <MaterialIcons name="menu" size={24} color={color} />
    </Pressable>
  );
}

// Main App with Drawer Layout
export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <NavigationContainer>
      <Drawer
        open={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
        drawerPosition="right"
        drawerType="front"
        drawerStyle={{
          width: 320,
          backgroundColor: '#FFFFFF',
        }}
        swipeEnabled={true}
        swipeEdgeWidth={50}
        renderDrawerContent={() => (
          <CustomDrawerContent onClose={closeDrawer} />
        )}
      >
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
              title: 'Suma de Teológia',
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
              headerRight: () => (
                <DrawerButton color="#FFFFFF" onPress={openDrawer} />
              ),
            }}
          />
          <Stack.Screen
            name="PartScreen"
            component={PartScreen}
            options={({ route }) => ({
              title: `Parte ${route.params.part.id}`,
              headerRight: () => (
                <DrawerButton color="#000000" onPress={openDrawer} />
              ),
            })}
          />
          <Stack.Screen
            name="QuestionScreen"
            component={QuestionScreen}
            options={({ route }) => ({
              title: `Cuestión ${route.params.question.id}`,
              headerRight: () => (
                <DrawerButton color="#000000" onPress={openDrawer} />
              ),
            })}
          />
          <Stack.Screen
            name="ArticleScreen"
            component={ArticleScreen}
            options={({ route }) => ({
              title: `Artículo ${route.params.article.id}`,
              headerRight: () => (
                <DrawerButton color="#000000" onPress={openDrawer} />
              ),
            })}
          />
        </Stack.Navigator>
      </Drawer>
    </NavigationContainer>
  );
} 