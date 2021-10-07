import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './home';
import EquipmentScreen from '../equipment/equipment';
import DetailsScreen from '../details/details'


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Equipment" component={EquipmentScreen} />
  </Stack.Navigator>

</NavigationContainer>)
}

export default HomeStack