import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { QuerySnapshot, addDoc, collection, getDocs } from 'firebase/firestore'

export default function Comments({ id }: number) {
  const [testtext, setTestText] = useState('')
  const [allComments, setAllComments] = useState<any[]>([])
  const [needRefresh, setNeedRefresh] = useState(false)

  useEffect(() => {
    let listetest: any[] = []
    getDocs(collection(FIREBASE_DB, 'comments')).then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        listetest.push([doc.data().idgames, doc.data().text, doc.data().pseudo, doc.data().photoURLUser])
      )
      setAllComments(listetest)
      // console.log(allComments)
    })
  }, [needRefresh])

  const auth = FIREBASE_AUTH

  const AddDB = async (text) => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, 'comments'), {
        idgames: id,
        text: text,
        pseudo: auth.currentUser?.displayName,
        photoURLUser: auth.currentUser?.photoURL
      })
      setTestText('')
      setNeedRefresh(!needRefresh)

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Comments</Text>

        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.textinput}
              value={testtext}
              placeholder="Comments"
              onChangeText={(text) => setTestText(text)}
              onSubmitEditing={() => AddDB(testtext)}
            ></TextInput>
          </View>
          <View style={styles.logoutcontainer}>
            <Pressable style={styles.button} onPress={() => AddDB(testtext)}>
              <Text style={styles.textbutton}>Add Comment</Text>
            </Pressable>
          </View>
        </ScrollView>
        {allComments.map((comment, index) => {
          if (comment[0] === id) {
            return (
              <View key={index} style={styles.commentContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: comment[3]
                    }}
                  />
                  <Text style={styles.commentusername}>{comment[2]}</Text>
                </View>

                <Text style={styles.texte}>{comment[1]}</Text>
              </View>
            )
          }
        })}
      </KeyboardAvoidingView>
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
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },

  image: {
    width: 50,
    height: 50
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 'auto'
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
    justifyContent: 'center'
  },

  commentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    margin: 10
  },
  commentusername: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    fontSize: 25
  },
  texte: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
})
