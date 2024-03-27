import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { Game } from '../../services/api/games/type'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import Comments from '../Comments/Comments'
import LikeButton from '../likebutton/LikeButton'

export default function Details({ game }: Game) {
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err))
  }
  const url = game?.game_url
  let icongamestatus = null
  if (game?.status === 'Live') {
    icongamestatus = '🟢'
  } else {
    icongamestatus = '🔴'
  }
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Image
        source={{
          uri: game?.thumbnail
        }}
        style={styles.image}
      />

      <Text style={styles.titlegame}>{game?.title.toUpperCase()}</Text>

      <Text style={styles.title}>STATUS</Text>
      <Text style={styles.texte}>
        {game?.status}
        {icongamestatus}
      </Text>

      <Text style={styles.title}>DESCRIPTION</Text>
      <Text style={styles.texte}>{game?.short_description}</Text>
      <Text style={styles.texte}>{game?.description}</Text>

      <Text style={styles.title}>URL</Text>
      {game?.game_url && (
        <View style={styles.buttoncontainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              openURL(url)
            }}
          >
            <Text style={styles.textbutton}>Click Here</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.title}>GENRE</Text>
      <Text style={styles.texte}>{game?.genre}</Text>

      <Text style={styles.title}>PLATFORM</Text>
      <Text style={styles.texte}>{game?.platform}</Text>

      <Text style={styles.title}>PUBLISHER</Text>
      <Text style={styles.texte}>{game?.publisher}</Text>

      <Text style={styles.title}>DEVELOPPER</Text>
      <Text style={styles.texte}>{game?.developer}</Text>

      <Text style={styles.title}>RELEASE DATE</Text>
      <Text style={styles.texte}>{game?.release_date}</Text>

      {game?.minimum_system_requirements && <Text style={styles.title}>MINIMUM REQUIREMENTS</Text>}
      <Text style={styles.texte}>{game?.minimum_system_requirements?.os}</Text>
      <Text style={styles.texte}>{game?.minimum_system_requirements?.processor}</Text>
      <Text style={styles.texte}>{game?.minimum_system_requirements?.memory}</Text>
      <Text style={styles.texte}>{game?.minimum_system_requirements?.graphics}</Text>
      <Text style={styles.texte}>{game?.minimum_system_requirements?.storage}</Text>

      {game?.screenshots[0] && <Text style={styles.title}>SCREENSHOTS</Text>}

      {game?.screenshots?.map(({ id, image }, index) => {
        return (
          <View key={index}>
            <Image
              source={{
                uri: image
              }}
              style={styles.image}
            />
          </View>
        )
      })}

      <Comments id={game?.id} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 365,
    height: 206
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },

  titlegame: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 50
  },

  texte: {
    textAlign: 'center'
  },
  buttoncontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
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
