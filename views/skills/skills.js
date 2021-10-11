import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const SkillScreen = ({ navigation }) => {

  const [skills, setSkills] = useState()

      const getSkills = () => {
        console.log("Hello there")
        fetch(`https://mordheim-database.herokuapp.com/skills`)
          .then((response) => response.json())
          .then((json) => {
              setSkills([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!skills){
        getSkills();
        }
      }, []);

      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%",
           
            
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
      <SafeAreaView>
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.containerStyle}>
        {skills && skills.map(s => {
          return(
            <View style={styles.textContainerStyle} key= {s.id}>
            <Text>{s.name} </Text>
            <Text>{s.type}</Text>
            <Text style = {styles.textBottom}>{s.description}</Text>
            </View>
          )
        })}
        </View>
       
      </View>

           
        
    <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Home')}
        />    
      </ScrollView>
      </SafeAreaView>
    );
  }

  export default SkillScreen;