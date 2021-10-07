import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const navBar = () => {

    const styles = StyleSheet.create({
        header: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        headerText: {
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: 1
        }

    })

    return(
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Equipment</Text>
            </View>
        </View>
    )
    }

  