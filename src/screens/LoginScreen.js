import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async () => {
    const cleanEmail = email.trim()

    if (!cleanEmail || !password) {
      Alert.alert('Error', 'Completá email y contraseña')
      return
    }

    try {
      // 👉 INTENTO CREAR USUARIO
      await createUserWithEmailAndPassword(auth, cleanEmail, password)
      navigation.replace('Home')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // 👉 SI YA EXISTE, LOGIN
        try {
          await signInWithEmailAndPassword(auth, cleanEmail, password)
          navigation.replace('Home')
        } catch (err) {
          Alert.alert('Error', 'Contraseña incorrecta')
        }
      } else {
        Alert.alert('Error', error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GiftSplit 🎁</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña (mínimo 6)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Ingresar / Registrarse" onPress={handleAuth} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
})