import React, { createContext, useContext, useState} from 'react';
import { Feed, SignIn, SignUp, UserProfile, CreateStoryScreen } from './src/pages/Index.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createNativeStackNavigator();

const UserContext = createContext();

export default function App() {

  const [user, setUser] = useState({ username: 'Lucas' });
  
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="Feed" component={Feed} options={{headerShown: false}}/>
          <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}}/>
          <Stack.Screen name="CreateStory" component={CreateStoryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

AppRegistry.registerComponent(appName, () => App);