
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, } from 'react-native';

const HomeScreen = ({ navigation }) => {

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
            justifyText: 'center',
            maxWidth: "100%" 
        }
    }
    



    return (
      // <SafeAreaView>
    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
    <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Welcome to the mordheim catalogger</Text>
    <Text>In here you can view warbands, equipment, skills, spells, scenarios, weapons and armour.</Text>
    <Text>It may take a second or two to fetch the data from the database, hope you enjoy!</Text>
    <Text style={{ marginTop: 10, fontStyle: 'italic' }}>Click on the menu to see options</Text>
    </View>
    );
  }

  export default HomeScreen;