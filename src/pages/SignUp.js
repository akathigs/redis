import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const IP = '192.168.1.12';
  const PORT = 3001;

  async function handleSignUp() {
    try {
      const newUser = {
        name: name,
        email: email,
        password: password
      };
      await axios.post(`http://${IP}:${PORT}/user`, newUser);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Have Happy!</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" 
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="senha"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eye_icon}>
                    <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color="grey" />
                </TouchableOpacity>
            </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#5e2abf',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5e2abf',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpText: {
    marginTop: 20,
    color: '#000',
  },
  signUpLink: {
    color: '#5e2abf',
  },
  eye_icon: {
    position: 'absolute',
    right: 10,
  },
});
