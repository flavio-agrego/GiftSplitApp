🎁 GiftSplit App

Aplicación mobile desarrollada con React Native + Expo para gestionar listas de regalos compartidas, permitiendo reservar regalos y agregar imágenes, con persistencia local.

🚀 Tecnologías utilizadas

React Native

Expo

Redux Toolkit

Firebase Authentication

AsyncStorage

Expo Image Picker

📱 Funcionalidades
🔐 Autenticación

Login y registro automático con Firebase Auth

Inicio de sesión con email y contraseña

🎁 Gestión de regalos

Lista de regalos predefinida

Reserva de regalos por usuario

Visualización de quién reservó cada regalo

Persistencia local de los datos

🖼️ Imágenes

Selección de imágenes desde la galería del dispositivo

Asociación de una imagen a cada regalo

Guardado local de imágenes (URI)

🗂️ Estructura básica del proyecto
src/
 ├─ firebase/
 │   └─ config.js
 ├─ screens/
 │   ├─ LoginScreen.js
 │   └─ HomeScreen.js
 ├─ store/
 │   └─ authSlice.js
 └─ App.js

⚙️ Instalación y ejecución

Clonar el repositorio:

git clone <url-del-repo>


Instalar dependencias:

npm install


Instalar dependencias de Expo:

expo install expo-image-picker
expo install @react-native-async-storage/async-storage


Ejecutar la app:

expo start

🔑 Configuración de Firebase

Crear un proyecto en Firebase

Habilitar Authentication → Email/Password

Copiar las credenciales en:

src/firebase/config.js

🧪 Datos de prueba

Email: test@test.com

Password: 123456

(Si no existe, el usuario se crea automáticamente)

📌 Notas finales

La persistencia se realiza con AsyncStorage

Las imágenes se guardan localmente (no en la nube)

Proyecto enfocado en funcionalidad y estructura clara

👤 Autor
Elio Flavio Martinez.
Proyecto académico / demo de aplicación mobile con React Native.
