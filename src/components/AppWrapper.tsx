// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const AppWrapper = ({children}) => {
  return (
    /* flex: 1 --> access whole screen height */
    <SafeAreaView style={{flex:1}}>
      {children}
    </SafeAreaView>
  )
}

export default AppWrapper
