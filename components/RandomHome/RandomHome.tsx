import {
  Button,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Game, GameAll } from '../../services/api/games/type'
import { TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { getAllGames } from '../../services/api/games/request'
import Card from '../Card/Card'
import { useNavigation } from '@react-navigation/native'

export default function RandomHome() {
  const [games, setGames] = useState<GameAll[]>([])
  const navigation = useNavigation()
  useEffect(() => {
    getAllGames().then((data) => {
      setGames(data)
    })
  }, [refreshing])

  let array = [...games]
  const shuffled = array.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, 10)
  console.log('Shuffle list', selected)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {selected?.map((game) => {
        return (
          <Pressable key={game.id} onPress={() => navigation.navigate('GameDetails', { id: game.id })}>
            <Card props={game} />
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  image: {
    justifyContent: 'center'
  }
})
