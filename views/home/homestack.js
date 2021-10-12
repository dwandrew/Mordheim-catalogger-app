import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './home';
import SkillScreen from '../skills/skills';
import EquipmentScreen from '../equipment/equipment';
import DetailsScreen from '../details/details'
import Navbar from '../navbar/navbar';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(
<NavigationContainer>
<Stack.Navigator 
initialRouteName="Home"
screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
>
    <Stack.Screen name="Home" component={HomeScreen} options={{ 
        title: 'Home screen yall',
        }}/>
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Equipment" component={EquipmentScreen} />
    <Stack.Screen name="Skills" component={SkillScreen}/>
  </Stack.Navigator>

</NavigationContainer>)
}

export default HomeStack