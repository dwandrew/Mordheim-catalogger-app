import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const [equipment, setEquipment] = useState()

      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%"
        },
        textContainerStyle: {
            flex: 2,
            flexDirection: 'column',
            margin: 10,
            justifyText: 'center',
            maxWidth: "100%" 
        }
    }
    



    return (
      <SafeAreaView>
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: "95%" }}>
        <Text>This is the Home Screen</Text>
       
      </View>

           
        
      </ScrollView>
      <View>
    <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />    
    <Button
          title="Go to Equipment"
          onPress={() => navigation.navigate('Equipment')}
        />    
        </View>
      </SafeAreaView>
    );
  }

  export default HomeScreen;