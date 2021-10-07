import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './views/home/home';
import DetailsScreen from './views/details/details';
import EquipmentScreen from './views/equipment/equipment';
import DropdownMenu from 'react-native-dropdown-menu';

// global.api_url = "https://mordheim-database.herokuapp.com/"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    {/* <View style={styles.container}>
      <Text>This is my initial page</Text>
      <StatusBar style="auto" />
    </View> */}
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Equipment" component={EquipmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
