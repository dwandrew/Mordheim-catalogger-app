import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const EquipmentScreen = ({ navigation }) => {

  const [equipment, setEquipment] = useState()

      const getEquipment = () => {
        console.log("Hello there")
        fetch(`https://mordheim-database.herokuapp.com/equipment`)
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
            maxWidth: "100%",
            maxHeight: "100%"
            
        },
        textContainerStyle: {
            flex: 2,
            flexDirection: 'column',
            margin: 10,
            marginBottom: 0,
            justifyText: 'center',
            maxWidth: "100%",
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10
        },
        textBottom:{
          marginBottom: 10
        }
    }
    



    return (
      // <SafeAreaView >
      <ScrollView style = {{marginBottom: 40}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.containerStyle}>
        {!equipment ? <Text>information loading</Text> : 
        equipment && equipment.map(e => {
          let description = e.description.replace(/\  /g, "")
          return(
            <View style={styles.textContainerStyle} key= {e.id}>
            <Text style = {{fontWeight: "bold"}}>{e.name} </Text>
            <Text style = {{fontStyle: "italic"}} >{e.cost} Gold crowns</Text>
            <Text>{e.rarity}</Text>
            <Text style = {styles.textBottom}>{description}</Text>
            </View>
          )
        })}
        </View>
       
      </View>

          
    {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Home')}
        />     */}
      </ScrollView>
      // </SafeAreaView>
    );
  }

  export default EquipmentScreen;