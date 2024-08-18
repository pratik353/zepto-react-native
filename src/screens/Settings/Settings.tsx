import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { myColors } from '../../utils/Themes/Colors'

const Settings = () => {
  return (
    <View style={{
      flex:1,
      marginTop:StatusBar.currentHeight
    }}>
      <Text style={{
        color:myColors.black,
        fontSize:20
      }}>Settings</Text>
    </View>
  )
}

export default Settings