
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';


const ScenarioScreen = ({ navigation }) => {

  const [scenarios, setScenarios] = useState()
  

      const getScenarios = () => {
        fetch(`https://mordheim-database.herokuapp.com/scenarios`)
          .then((response) => response.json())
          .then((json) => {
            
            setScenarios([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!scenarios){
        getScenarios();
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
            paddingBottom: 15,
            borderStyle: "dashed"
            
        },
        innerTitle: {
            borderBottomWidth: 1,
            marginBottom: 3,
            fontStyle: "italic",
            fontWeight: "bold"
        },
        textBottom:{
          marginBottom: 10
        }
    }

    const displayScenarios = () => {
      return( scenarios.map(s => {
          
        return(
          <View style={styles.textContainerStyle} key= {s.id}>
            <Text style = {{fontWeight: "bold", fontSize: 16}}>{s.name} </Text>
            <Text style = {{fontStyle: "italic"}}>Scenario Number: {s.id} </Text>
            <Text style = {styles.innerTitle}> Description:</Text>
            <Text >{s.description} </Text>
            <Text style = {styles.innerTitle}>Terrain:</Text>
            <Text >{s.terrain} </Text>
            <Text style = {styles.innerTitle}>Warbands: </Text>
            <Text >{s.warbands} </Text>
            <Text style = {styles.innerTitle}>Starting: </Text>
            <Text >{s.starting} </Text>
            <Text style = {styles.innerTitle}>Ending: </Text>
            <Text >{s.ending} </Text>
            <Text style = {styles.innerTitle}>Experience: </Text>
            <Text >{s.experience} </Text>

            {s.wyrdstone !== "" ? <>
            <Text style = {styles.innerTitle}>Wyrdstone: </Text>
            <Text>{s.wyrdstone}</Text> 
            </>: null}
            {s.special_rules!=="" ? <>
            <Text style = {styles.innerTitle}>Special Rules: </Text>
            <Text >{s.special_rules} </Text>
            </>
            : null}
                       
        </View>
        )}
      
      )
    )
    }
  


    return (
    <View style = {{flex: 1,}}>
      <ScrollView style = {{marginBottom: 100}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.containerStyle}>
        {!scenarios ? <Text>information loading</Text> :
        scenarios && displayScenarios()}
        </View>
       
      </View>

      </ScrollView>
      </View>
    );
  }

  export default ScenarioScreen;