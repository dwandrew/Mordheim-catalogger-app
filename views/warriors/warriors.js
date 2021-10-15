import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withOrientation } from 'react-navigation';

const WarriorScreen = ({ navigation }) => {

  const [warriors, setWarriors] = useState()
  const [activeWarrior, setActiveWarrior] = useState("")

      const getWarriors = () => {
        fetch(`https://mordheim-database.herokuapp.com/warriors`)
          .then((response) => response.json())
          .then((json) => {
            setWarriors([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!warriors){
        getWarriors();
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
        {!warriors ? <Text>information loading</Text> :

        warriors && warriors.map(w => {
            let description = w.description.replace(/\  /g, "")
            console.log(w.description)
          return(
            <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{w.warrior_type}</Text>
            <Text>{description}</Text>
            {/* <Text style = {styles.textBottom}>Strength: {w.strength}</Text> */}
            {w.skills!== [] ? w.skills.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                return(<>
                <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{name}</Text>
                <Text style = {{fontStyle: "italic"}}>{r.skill_type}</Text>
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

  export default WarriorScreen;