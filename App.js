
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import HomeScreen from './views/home/home';
import SkillScreen from './views/skills/skills';
import EquipmentScreen from './views/equipment/equipment';
import WeaponScreen from './views/weapons/weapons';
import WarriorScreen from './views/warriors/warriors';
import ArmourScreen from './views/armour/armour';
import SpellScreen from './views/spells/spells';
// import HomeStack from './views/home/homestack';
import { LogBox } from 'react-native';


export default function App({navigation}) {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;


useEffect(() => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])


  const currentScreen = () => {
    if(currentTab !=="Home"){
    
      if(currentTab == "Skills")
    return(
      <SkillScreen/>
    )
      if(currentTab == "Equipment")
    return(
      <EquipmentScreen/>
    )
      if(currentTab == "Weapons")
    return(
      <WeaponScreen/>
    )
      if(currentTab == "Warriors")
    return(
      <WarriorScreen/>
    )
      if(currentTab == "Armour")
    return(
      <ArmourScreen/>
    )
      if(currentTab == "Spells")
    return(
      <SpellScreen/>
    )

    }
    else {
      return <HomeScreen/>
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", setShowMenu) }
          {TabButton(currentTab, setCurrentTab, "Warriors", setShowMenu) }
          {TabButton(currentTab, setCurrentTab, "Skills",  setShowMenu)}
          {TabButton(currentTab, setCurrentTab, "Spells",  setShowMenu)}
          {TabButton(currentTab, setCurrentTab, "Equipment",  setShowMenu)}
          {TabButton(currentTab, setCurrentTab, "Weapons",  setShowMenu)}
          {TabButton(currentTab, setCurrentTab, "Armour",  setShowMenu)}
          {/* {TabButton(currentTab, setCurrentTab, "Settings")} */}

        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow:"hidden",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
        
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            {showMenu ? <Text
            style={{
              height: 20,
              marginTop: 40,
              fontWeight: "bold",
            }}>Close menu</Text> : <Text style = {{fontWeight: "bold"}}>Menu</Text>}

          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20,
            paddingLeft: 10,
            textDecorationLine: "underline"
          }}>{currentTab}</Text>

          <ScrollView
          style = {{marginBottom: 20}}
          >
          {currentScreen()}
          </ScrollView>
        
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, setShowMenu) => {
  return (

    <TouchableOpacity onPress={() => {
        setCurrentTab(title)
        // setShowMenu(false)
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>


        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b0000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    
  },
});