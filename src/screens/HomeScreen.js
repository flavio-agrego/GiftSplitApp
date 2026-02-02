import * as ImagePicker from 'expo-image-picker'
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen() {
  const user = useSelector(state => state.auth.user)

  const [regalos, setRegalos] = useState([
    {
      id: '1',
      nombre: 'Cafetera',
      reservado: false,
      reservadoPor: null,
      image: null
    },
    {
      id: '2',
      nombre: 'Juego de sábanas',
      reservado: false,
      reservadoPor: null,
      image: null
    },
    {
      id: '3',
      nombre: 'Parlante Bluetooth',
      reservado: false,
      reservadoPor: null,
      image: null
    }
  ])

  // 🔹 Cargar regalos
  useEffect(() => {
    const cargarRegalos = async () => {
      try {
        const data = await AsyncStorage.getItem('regalos')
        if (data) setRegalos(JSON.parse(data))
      } catch (error) {
        console.log('Error al cargar regalos', error)
      }
    }

    cargarRegalos()
  }, [])

  // 🔹 Guardar regalos
  useEffect(() => {
    AsyncStorage.setItem('regalos', JSON.stringify(regalos))
  }, [regalos])

  // 🔹 Reservar regalo
  const reservarRegalo = (id) => {
    setRegalos(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, reservado: true, reservadoPor: user.nickname }
          : r
      )
    )
  }

  // 🔹 Elegir imagen
  const elegirImagen = async (id) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6
    })

    if (!result.canceled) {
      setRegalos(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, image: result.assets[0].uri }
            : r
        )
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🎉 Bienvenido {user?.nickname}
      </Text>

      <FlatList
        data={regalos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>🎁 {item.nombre}</Text>

            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
            )}

            <Text>
              📌 {item.reservado
                ? `Reservado por ${item.reservadoPor}`
                : 'Disponible'}
            </Text>

            <Button
              title="Agregar imagen"
              onPress={() => elegirImagen(item.id)}
            />

            {!item.reservado && (
              <Button
                title="Reservar"
                onPress={() => reservarRegalo(item.id)}
              />
            )}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  card: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 180,
    marginVertical: 10,
    borderRadius: 8
  }
})