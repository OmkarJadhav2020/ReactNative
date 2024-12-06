import { Redirect, Stack,router } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useEffect(() => {
    const checkLogin = async () => {
      const sessionId = await AsyncStorage.getItem('sessionid');
      if (sessionId) {
        try {
          const response = await fetch('http://192.168.63.86:8000/api/accounts/me/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${sessionId}`,
                'Content-Type': 'application/json',
            },
            
        });
        
          if (response.status === 200) {
            console.log('User is authenticated');
            let data = await response.json();
            console.log(data.role)
            data = data.role
            if(data === 'admin')
            {
              router.replace("/(admin)")
            }
            else if(data==='investigator')
            {
              router.replace("/(investigator)")
            }
            else
            {
              router.replace("/(auth)")
            }
          }
        } catch (error) {
          console.error('Session invalid or expired');
          router.replace("/(auth)")
        }
      } else {
        console.log('User is not authenticated');
        router.replace("/(auth)")
      }
      SplashScreen.hideAsync();
    };
    checkLogin();
  }, []);  

  return (
    <>
      <Stack screenOptions={{headerShown:false}} />
      {/* {isLogin ? <Redirect href={"/(admin)"} /> : <Redirect href={"/(auth)"} />} */}
    </>
  );
}
