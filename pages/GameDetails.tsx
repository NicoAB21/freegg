import { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames } from '../services/api/games/request'
import { Game } from '../services/api/games/type'
import { Image } from 'react-native'
import Details from '../components/Details/Details'
import { getGameByID } from '../services/api/games/request'
import Comments from '../components/Comments/Comments'

export default function GameDetails({ route }) {
  const id = route.params
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    try {
      getGameByID(id).then((data) => {
        //console.log('DATA is', data)
        setGame(data)
      })
    } catch (err) {
      console.log(err)
    }
  }, [id])

  return <Details game={game} />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  image: {
    width: 200,
    height: 300
  }
})
