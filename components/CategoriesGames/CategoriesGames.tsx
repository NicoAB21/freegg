import { Image, StyleSheet, Text, View } from 'react-native'
import { Game } from '../../services/api/games/type'
import { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView } from 'react-native'
import Card from '../Card/Card'
import {
  getAllGames,
  getAllGamesAndPlatform,
  getGameByCategorie,
  getGameByCategorieAndPlatform
} from '../../services/api/games/request'
import { GameAll } from '../../services/api/games/type'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

export default function CategoriesGames({ categorie }) {
  const navigation = useNavigation()
  const [games, setGames] = useState<GameAll[]>([])
  const [original, setOriginal] = useState<GameAll[]>([])
  const [health, setHealth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (categorie === 'ALL') {
      getAllGamesAndPlatform(global.platform).then((data) => {
        if (data?.status === 0) {
          setHealth(false)
          setGames([])
        } else {
          setGames(data)
          setOriginal(data)
          setHealth(true)
        }
      })
    } else {
      getGameByCategorieAndPlatform(categorie, global.platform).then((data) => {
        if (data?.status === 0) {
          setHealth(false)
          setLoading(false)
          setGames([])
        } else {
          setGames(data)
          setOriginal(data)
          setHealth(true)
        }
      })
    }
  }, [])

  return (
    <ScrollView>
      {health ? (
        games?.map((game: GameAll, index) => {
          return (
            <Pressable key={game.id} onPress={() => navigation.navigate('GameDetails', { id: game.id })}>
              <Card props={game} />
            </Pressable>
          )
        })
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          {loading ? (
            <LottieView
              source={require('../../assets/Mario.json')}
              style={{ width: 370, height: 370, flex: 1, marginTop: 100 }}
              autoPlay
              loop
            />
          ) : (
            <LottieView
              source={require('../../assets/Error404.json')}
              style={{ width: 370, height: 370, flex: 1, marginTop: 100 }}
              autoPlay
              loop
            />
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  error: {
    alignItems: 'center'
  }
})
