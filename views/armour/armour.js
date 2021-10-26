
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';


const ArmourScreen = ({ navigation }) => {

  const [armour, setArmour] = useState()
  

      const getArmour = () => {
        fetch(`https://mordheim-database.herokuapp.com/armours`)
          .then((response) => response.json())
          .then((json) => {
            
            setArmour([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!armour){
        getArmour();
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

    const displayArmour = () => {
      return( armour.map(w => {
        return(
          <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text>{w.rarity}</Text>
            {w.saving_throw !== "-" ? <Text>Saving throw: {w.saving_throw}</Text> : null}
            {w.special_rules.length > 0 ? w.special_rules.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.replace(/\  /g, "")
                return(<>
                <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{name == "Shielded" ? "Optional rule: " : ""}{name}</Text>
                <Text style = {styles.textBottom}>{desc}</Text>
                </>
                )
            }) : <Text></Text>}
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
        {!armour ? <Text>information loading</Text> :
        armour && displayArmour()}
        </View>
       
      </View>

      </ScrollView>
      </View>
    );
  }

  export default ArmourScreen;