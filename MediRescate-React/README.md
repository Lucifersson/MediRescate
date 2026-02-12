# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Maps setup (Expo SDK 54)

Se agregó `expo-maps` para Expo SDK 54 con la versión compatible (`~0.12.10`).

### Instalación recomendada por Expo

```bash
npx expo install expo-maps
```

> Si tu entorno restringe acceso a la red/registro npm, usa la versión compatible fijada por Expo SDK 54:
>
> ```bash
> npm install expo-maps@~0.12.10
> ```

### Configuración mínima (Android / iOS)

Según la documentación oficial de `expo-maps` para SDK 54:

- Usa un **development build** (no funciona en Expo Go).
- Android requiere usar un emulador/dispositivo con Google Play Services para renderizado completo de mapas.
- iOS usa Apple Maps por defecto y no requiere clave para el proveedor nativo.

### Claves y permisos

- Si utilizas un proveedor de Google Maps en Android, configura una API key en `app.json`:

  ```json
  {
    "expo": {
      "android": {
        "config": {
          "googleMaps": {
            "apiKey": "TU_GOOGLE_MAPS_API_KEY"
          }
        }
      }
    }
  }
  ```

- Solo agrega permisos de ubicación (`expo-location`) si tu funcionalidad de mapa necesita centrar en ubicación del usuario o tracking en tiempo real.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
