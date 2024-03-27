import React, { useContext, useState } from 'react'
import { Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import CheckBox from 'expo-checkbox'
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'

export default function Settings() {
  const [pc, setPC] = useState(false)
  const [browser, setBrowser] = useState(false)
  const [all, setAll] = useState(true)

  const auth = FIREBASE_AUTH

  if (all === true) {
    global.platform = 'all'
  }

  const handleChangeAll = () => {
    setAll(true)
    setBrowser(false)
    setPC(false)
    global.platform = 'all'
  }

  const handleChangePC = () => {
    setAll(false)
    setBrowser(false)
    setPC(true)
    global.platform = 'pc'
  }

  const handleChangeBrowser = () => {
    setAll(false)
    setBrowser(true)
    setPC(false)
    global.platform = 'browser'
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.checkboxcontainer}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={all}
          color={'black'}
          onValueChange={() => handleChangeAll()}
        />
        <Text style={styles.title}>All</Text>
      </View>

      <View style={styles.checkboxcontainer}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={pc}
          color={'black'}
          onValueChange={() => handleChangePC()}
        />
        <Text style={styles.title}>PC</Text>
      </View>

      <View style={styles.checkboxcontainer}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={browser}
          color={'black'}
          onValueChange={() => handleChangeBrowser()}
        />
        <Text style={styles.title}>Browser</Text>
      </View>

      <Text style={styles.texte}>Platform: {global.platform.toUpperCase()}</Text>
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
    fontSize: 25,
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
