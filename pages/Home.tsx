import { useEffect, useState } from 'react'
import { Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames } from '../services/api/games/request'
import { Game, GameAll } from '../services/api/games/type'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import RandomHome from '../components/RandomHome/RandomHome'
import LottieView from 'lottie-react-native'

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true)
  global.platform = 'all'
  setTimeout(() => {
    setLoading(false)
  }, 3000)

  return (
    <View>
      {loading ? (
        <View>
          <LottieView
            source={require('../assets/Mario.json')}
            style={{ width: '100%', height: '100%' }}
            autoPlay
            loop
          />
        </View>
      ) : (
        <RandomHome />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    justifyContent: 'center'
  }
})
