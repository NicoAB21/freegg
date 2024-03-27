import { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames, getGameByCategorie } from '../services/api/games/request'
import { GameAll } from '../services/api/games/type'
import { Image } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function List({ navigation }) {
  const categories_list = [
    '2D',
    '3D',
    'ALL',
    'ACTION',
    'ACTION-RPG',
    'ANIME',
    'BATTLE-ROYALE',
    'CARD',
    'FANTASY',
    'FIGHTING',
    'FIRST-PERSON',
    'FLIGHT',
    'HORROR',
    'LOW-SPEC',
    'MARTIAL-ARTS',
    'MILITARY',
    'MMO',
    'MMOFPS',
    'MMORPG',
    'MMORTS',
    'MMOTPS',
    'MOBA',
    'OPEN-WORLD',
    'PVE',
    'PVP',
    'PERMADEATH',
    'PIXEL',
    'RACING',
    'SANDBOX',
    'SAILING',
    'SCI-FI',
    'SHOOTER',
    'SIDE-SCROLLER',
    'SOCIAL',
    'SPACE',
    'SPORTS',
    'STRATEGY',
    'SUPERHERO',
    'SURVIVAL',
    'TANK',
    'THIRD-PERSON',
    'TOP-DOWN',
    'TURN-BASED',
    'VOXEL',
    'ZOMBIE'
  ]

  return (
    <ScrollView style={styles.container}>
      {categories_list.map((categorie: string, index) => {
        return (
          <View key={index} style={styles.buttoncontainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Categorie', { categorie: categorie })}>
              <Text style={styles.text}>{categorie}</Text>
            </Pressable>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  buttoncontainer: {
    padding: 10
  }
})
