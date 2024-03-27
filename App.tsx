import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import List from './pages/List'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import GameDetails from './pages/GameDetails'
import Ionicons from '@expo/vector-icons/Ionicons'
import Categorie from './pages/Categorie'
import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './FirebaseConfig'
import Sandbox from './pages/Sandbox'
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import ChangeProfilePic from './pages/ChangeProfilePic'
import ChangePseudo from './pages/ChangePseudo'

const AuthStack = createNativeStackNavigator()
const AppStack = createBottomTabNavigator()
const GameStack = createNativeStackNavigator()
const SideBarStack = createDrawerNavigator()

function General() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Ionicons name="home" size={25} color="black" />
        }}
      />

      <AppStack.Screen
        name="List"
        component={List}
        options={{
          title: 'Categories',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Ionicons name="list" size={25} color="black" />
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Ionicons name="person" size={25} color="black" />
        }}
      />

      <AppStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Ionicons name="settings" size={25} color="black" />
        }}
      />
    </AppStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user)
      setUser(user)
    })
  }, [])

  return (
    <NavigationContainer>
      {user ? (
        <GameStack.Navigator>
          <GameStack.Screen
            name="General"
            component={General}
            options={{
              headerShown: false
            }}
          />

          <GameStack.Screen
            name="GameDetails"
            component={GameDetails}
            options={({ navigation, route }) => ({
              headerStyle: {
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center'
            })}
          />
          <GameStack.Screen
            name="Categorie"
            component={Categorie}
            options={{
              headerStyle: {
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center'
            }}
          />
          <GameStack.Screen
            name="ChangeProfilePic"
            component={ChangeProfilePic}
            options={{
              headerStyle: {
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center'
            }}
          />
          <GameStack.Screen
            name="ChangePseudo"
            component={ChangePseudo}
            options={{
              headerStyle: {
                backgroundColor: 'black'
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center'
            }}
          />
        </GameStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  )
}
