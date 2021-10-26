
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';


const MutationsScreen = ({ navigation }) => {

  const [mutation, setMutations] = useState()
  

      const getMutations = () => {
        fetch(`https://mordheim-database.herokuapp.com/mutations`)
          .then((response) => response.json())
          .then((json) => {
            
            setMutations([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!mutation){
        getMutations();
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

    const displayMutations = () => {
      return( mutation.map(w => {
        return(
          <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text>{w.description}</Text>
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
        {!mutation ? <Text>information loading</Text> :
        mutation && displayMutations()}
        </View>
       
      </View>

      </ScrollView>
      </View>
    );
  }

  export default MutationsScreen;