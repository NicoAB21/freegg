import { StatusBar } from 'expo-status-bar'
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

export default function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH

  const signUp = async () => {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response)

      updateProfile(auth.currentUser, {
        displayName: pseudo,
        photoURL:
          'https://cdn3.iconfinder.com/data/icons/basic-ui-element-s94-3/64/Basic_UI_Icon_Pack_-_Glyph_user-512.png'
      })
        .then(() => {
          console.log('Account Created !')
          alert('Account Created !')

          navigation.navigate('Home')
        })
        .catch((error) => {
          console.log('Error :', error)
          alert('Error occured while creating the profile')
        })
    } catch (error: any) {
      console.log(error)
      alert('Sign Up failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.textinput}
          value={pseudo}
          placeholder="Pseudo"
          onChangeText={(text) => setPseudo(text)}
        ></TextInput>
        <TextInput
          style={styles.textinput}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          style={styles.textinput}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Pressable style={styles.button} onPress={signUp}>
              <Text style={styles.textbutton}>Register</Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})
