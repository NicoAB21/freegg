import { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames, getGameByCategorie } from '../services/api/games/request'
import { Game, GameAll } from '../services/api/games/type'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import RandomHome from '../components/RandomHome/RandomHome'
import CategoriesGames from '../components/CategoriesGames/CategoriesGames'
import LottieView from 'lottie-react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { updateProfile } from 'firebase/auth'

export default function ChangePseudo({ navigation }) {
  const auth = FIREBASE_AUTH
  const [inputpseudo, setInputPseudo] = useState('')
  const [currentPseudo, setCurrentPseudo] = useState(auth.currentUser?.displayName)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setCurrentPseudo(auth.currentUser?.displayName)
  }, [refresh])

  const updatePseudo = async () => {
    try {
      updateProfile(auth.currentUser, {
        displayName: inputpseudo
      })
        .then(() => {
          setRefresh(!refresh)
          alert('Pseudo updated !')

          navigation.navigate('Profile')
          setRefresh(!refresh)
        })
        .catch((error) => {
          console.log('Error :', error)
          alert('Error occured while updating the pseudo')
        })
    } catch (error: any) {
      console.log(error)
      alert('Pseudo update fail: ' + error.message)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', marginTop: 250 }}>
        <Text style={styles.texte}>Insert your new Pseudo</Text>
        <TextInput
          style={styles.textinput}
          value={inputpseudo}
          placeholder={currentPseudo}
          onChangeText={(text) => setInputPseudo(text)}
        ></TextInput>
        <Pressable style={styles.button} onPress={updatePseudo}>
          <Text style={styles.textbutton}>Change</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  checkbox: {
    width: 50,
    height: 50
  },
  checkboxcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },

  texte: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },

  image: {
    width: 400,
    height: 607
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 20
  },
  textbutton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  logoutcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
})
