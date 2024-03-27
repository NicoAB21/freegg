import { useCallback, useEffect, useState } from 'react'
import { Button, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card/Card'
import { getAllGames, getGameByCategorie } from '../services/api/games/request'
import { Game, GameAll } from '../services/api/games/type'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import RandomHome from '../components/RandomHome/RandomHome'
import CategoriesGames from '../components/CategoriesGames/CategoriesGames'
import LottieView from 'lottie-react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Profile({ navigation }) {
  const auth = FIREBASE_AUTH
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ alignItems: 'center' }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: auth.currentUser?.photoURL
            }}
          />
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person" size={25} color="black" />
            <Text style={styles.title}>{auth.currentUser?.displayName}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="mail" size={25} color="black" />
            <Text style={styles.title}>{auth.currentUser?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoutcontainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ChangeProfilePic')}>
          <Text style={styles.textbutton}>Change Profile Picture</Text>
        </Pressable>
      </View>
      <View style={styles.logoutcontainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ChangePseudo')}>
          <Text style={styles.textbutton}>Change Pseudo</Text>
        </Pressable>
      </View>
      <View style={styles.logoutcontainer}>
        <Pressable style={styles.buttonlogout} onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={styles.textbutton}>Log Out</Text>
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
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },

  texte: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 90,
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 2
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
  buttonlogout: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
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
    marginTop: 25
  }
})
