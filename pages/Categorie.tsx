import { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames, getGameByCategorie } from '../services/api/games/request'
import { Game, GameAll } from '../services/api/games/type'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import RandomHome from '../components/RandomHome/RandomHome'
import CategoriesGames from '../components/CategoriesGames/CategoriesGames'
import LottieView from 'lottie-react-native'

export default function Categorie({ route }) {
  const categorie = route.params.categorie

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <CategoriesGames categorie={categorie} />
    </ScrollView>
  )
}
