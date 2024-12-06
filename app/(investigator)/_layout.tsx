import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name="index"  />
        
    </Tabs>
  )
}

export default _layout