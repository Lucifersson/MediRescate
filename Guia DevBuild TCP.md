## 🚀 Guía de Configuración: Sockets TCP en Expo

Sigue estos pasos en orden dentro de la terminal, asegurándote de estar ubicado en la carpeta **`react`** de tu proyecto.

### 1. Instalación de Dependencias

Instala el paquete de sockets y el cliente de desarrollo necesario para módulos nativos.

```bash
npx expo install react-native-tcp-socket expo-dev-client

```

### 2. Generación de Archivos Nativos (Prebuild)

Crea la carpeta de Android con las configuraciones necesarias.

```bash
npx expo prebuild

```

### 3. Primera Ejecución

Compila e instala la aplicación en tu dispositivo o emulador Android.

```bash
npx expo run:android

```

### 4. Limpieza y Reconfiguración (Si hay errores)

Si encuentras problemas de dependencias o de compilación, ejecuta este bloque de limpieza profunda:

- **Corregir dependencias:**

```bash
npx expo install --fix

```

- **Limpieza de caché nativa:**

```bash
rm -rf android

```

- **Re-generación y ejecución limpia:**

```bash
npx expo prebuild
npx expo run:android

```

---

> **Nota:** Al usar `expo-dev-client`, recuerda que ya no puedes usar la app de "Expo Go" estándar; debes usar la compilación personalizada que generan estos comandos.
