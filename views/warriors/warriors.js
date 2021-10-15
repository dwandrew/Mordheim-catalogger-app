import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions} from 'react-native';
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

const numColumns = 9;
const size = Dimensions.get('window').width/(numColumns+2);

const statGrid = (data) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.value}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
  );
}

      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%",
        },
        itemContainer: {
            width: "11%",
            height: 25,

          },
          item: {
            flex: 1,
            margin: 0,
            borderWidth: 1,
            borderColor: "black",
            // width: 35,
            textAlign: 'center',
            // height: 20,
            // paddingLeft: 10,
            // padding: 'auto'
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
            let stats =   [
                    {id: `move_${w.id}`, value: `M`}, 
                    {id: `weapon_skill_${w.id}`, value: `WS`}, 
                    {id: `ballistic_skill_${w.id}`, value: `BS`}, 
                    {id: `strength_${w.id}`, value: `S`}, 
                    {id: `toughness_${w.id}`, value: `T`}, 
                    {id: `wounds_${w.id}`, value: `W`}, 
                    {id: `initiative_${w.id}`, value: `I`}, 
                    {id: `attacks_${w.id}`, value: `A`}, 
                    {id: `leadership_${w.id}`, value: `LD`}, 
                    {id: `m_stat_${w.id}`, value: w.move},
                    {id: `ws_stat_${w.id}`, value: w.weapon_skill},
                    {id: `bs_stat_${w.id}`, value: w.ballistic_skill},
                    {id: `str_stat_${w.id}`, value: w.strength},
                    {id: `t_stat_${w.id}`, value: w.toughness},
                    {id: `w_stat_${w.id}`, value: w.wounds},
                    {id: `i_stat_${w.id}`, value: w.initiative},
                    {id: `a_stat_${w.id}`, value: w.attacks},
                    {id: `ls_stat_${w.id}`, value: w.leadership}
                    ]

          return(
            <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{w.warrior_type}</Text>
            <Text>{description}</Text>
            <View style = {{marginTop: 10, marginBottom: 10}}>
            {statGrid(stats)}
            </View>
            <View style = {{marginBottom: 10}}>
            <Text style = {{fontWeight: "bold"}} >Equipment list:</Text>
            {w.equipment_lists  !== [] ? w.equipment_lists.map(e_l => {
                return(<Text>{w.name}'s can use equipment from the {e_l.name}</Text>)})
                 : <Text>{w.name}'s cannot use equipment</Text>}
            {/* <Text style = {styles.textBottom}>Strength: {w.strength}</Text> */}
            </View>
            <View style = {{marginBottom: 10}}>
            {w.skills!== [] ? w.skills.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.replace(/\  /g, "-")
                return(<>
                <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{name}</Text>
                <Text style = {{fontStyle: "italic"}}>{r.skill_type} skill</Text>
                <Text style = {styles.textBottom}>{desc}</Text>
                </>
                )
            }) : null}
            </View>
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