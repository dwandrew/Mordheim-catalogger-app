import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withOrientation } from 'react-navigation';

const WeaponScreen = ({ navigation }) => {

  const [weapons, setWeapons] = useState()
  const [activeWeapon, setActiveWeapon] = useState("")

      const getWeapons = () => {
        fetch(`https://mordheim-database.herokuapp.com/weapons`)
          .then((response) => response.json())
          .then((json) => {
            setWeapons([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!weapons){
        getWeapons();
        }
      }, []);

      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%",
           
            
        },
        button: {
            alignItems: "center",
            backgroundColor: "black",
            borderRadius: 2,
            padding: 10,
            margin: 1
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
        },
        textBottom:{
          marginBottom: 10
        }
    }

    return (
    <SafeAreaView style = {{flex: 1,}}>
      <ScrollView style = {{marginBottom: 100}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.containerStyle}>

        {weapons && weapons.map(w => {

          return(
            <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text>{w.rarity}</Text>
            <Text>{w.range !== "Close combat" ? "Range: " : null}{w.range}</Text>
            <Text style = {styles.textBottom}>Strength: {w.strength}</Text>
            {w.special_rules!== [] ? w.special_rules.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                return(<>
                <Text style = {{fontStyle: "italic"}}>{name}</Text>
                <Text style = {styles.textBottom}>{desc}</Text>
                </>
                )
            }) : null}
            </View>
          )
        })}
        </View>
       
      </View>

      </ScrollView>
      </SafeAreaView>
    );
  }

  export default WeaponScreen;