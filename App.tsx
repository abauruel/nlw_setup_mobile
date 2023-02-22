// import { StatusBar } from 'expo-status-bar';
import { StatusBar, Button } from 'react-native';
import './src/lib/dayjs'

import { useFonts, Inter_600SemiBold, Inter_400Regular, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';

import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold
  })

  async function scheduleNotification() {
    const trigger = new Date(Date.now())
    trigger.setMinutes(trigger.getMinutes() + 1)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'ola, Alex',
        body: 'Voce praticou seus hábitos hoje?'
      },
      trigger
    })

  }


  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    < >
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
    </>
  );
}
