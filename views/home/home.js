import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const [equipment, setEquipment] = useState()

      const getEquipment = () => {
        console.log("Hello there")
        fetch(`https://mordheim-database.herokuapp.com/equipment`)
        // return fetch(`https://mordheim-database.herokuapp.com/equipment`)
          .then((response) => response.json())
          .then((json) => {
              setEquipment([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!equipment){
        getEquipment();
        }
      }, []);

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
            maxWidth: "100%" 
        }
    }
    



    return (
      <SafeAreaView>
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the Home Screen</Text>
        <View style={styles.containerStyle}>
        {equipment && equipment.map(e => {
          return(
            <View style={styles.textContainerStyle} key= {e.id}>
            <Text>{e.name} </Text>
            <Text>{e.cost} Gold crowns</Text>
            <Text>{e.rarity}</Text>
            <Text>{e.description}</Text>
            </View>
          )
        })}
        </View>
       
      </View>

           
        
    <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />    
      </ScrollView>
      </SafeAreaView>
    );
  }

  export default HomeScreen;