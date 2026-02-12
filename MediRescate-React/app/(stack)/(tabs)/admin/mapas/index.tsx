import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useOperariosDisponibles } from "@/hooks/useOperariosDisponibles";
import { useEffect } from "react";

const MapScreen = () => {
  const { operarios, solicitarOperarios } = useOperariosDisponibles();

  useEffect(() => {
    // Primera llamada inmediata al cargar la pantalla
    solicitarOperarios();

    // Configuramos el intervalo para ejecutar la llamada cada 5000ms
    const interval = setInterval(() => {
      console.log("Actualizando operarios...");
      solicitarOperarios();
    }, 5000);

    // Limpieza: detenemos el intervalo cuando el usuario sale de la pantalla
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        initialRegion={{
          latitude: 39.459520762987665,
          longitude: -0.47044131140655987,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      >
        {operarios.map((op) => {
          // Convertimos explícitamente a número para evitar el error de la imagen
          const lat = Number(op.latitud);
          const lng = Number(op.longitud);

          // Solo renderizamos si la conversión dio un número válido
          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <Marker
                key={op.id_operario}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                title={op.nombre}
                description={`ID: ${op.id_operario}`}
              />
            );
          }
          return null;
        })}
      </MapView>
    </SafeAreaView>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    //backgroundColor: 'red'
  },
});
