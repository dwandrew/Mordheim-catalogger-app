import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, ViewBase} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withOrientation } from 'react-navigation';

const SkillScreen = ({ navigation }) => {

  const [skills, setSkills] = useState()
  const skillTypes = [{key:"combat"}, {key:"shooting"}, {key:"academic"}, {key:"strength"}, {key:"speed"}, {key:"sisters of sigmar"}, {key:"skaven"}]
  const [activeSkill, setActiveSkill] = useState("combat")

      const getSkills = () => {
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
            paddingBottom: 10
        },
        textBottom:{
          marginBottom: 10
        }
    }
    
    const renderGridItem = ({item, index}) => {
      let title = item.key.split()
      title[0] = title[0].toUpperCase()
      title = title.join()
     
      return(
        <View style ={{flex: 1, margin: "auto",}}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => {setActiveSkill(item.key)}}
      >
        <Text style = {{color: "white", }}>{title}</Text>
        </TouchableOpacity>
        </View>
      )
    }


    return (
      <View>
      {/* // <SafeAreaView style = {{flex: 1}}> */}
      {/* <TouchableOpacity style = {{alignItems: 'flex-end'}} onPress = {()=> navigation.openDrawer}><Text>Open menu</Text></TouchableOpacity> */}
      <View style = {{width: "100%"}}>

      <FlatList
        data ={skillTypes}
        renderItem = {renderGridItem}
        numColumns = {"4"}
      />
      </View>
    
      <ScrollView style = {{marginBottom : 100}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.containerStyle}>
        {!skills ? <Text>information loading</Text> : 
        skills && skills.map(s => {
        if(s.skill_type == activeSkill && s.name !== "Rat ogre stupidity"){
          return(
            <View style={styles.textContainerStyle} key= {s.id}>
            <Text style = {{fontWeight: "bold"}}>{s.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{s.skill_type}</Text>
            <Text style = {styles.textBottom}>{s.description}</Text>
            </View>
          )
            }
        })}
        </View>
       
      </View>

      </ScrollView>
      {/* </SafeAreaView> */}
      </View>
    );
  }

  export default SkillScreen;