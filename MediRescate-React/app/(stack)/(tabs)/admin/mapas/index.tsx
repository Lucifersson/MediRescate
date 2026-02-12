import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MapScreen = () => {
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
        <Marker
          coordinate={{
            latitude: 39.45919266033844,
            longitude: -0.46964300466007,
          }}
          title="Guimarayz"
          description="Lugar de buenos almuerzos"
        />
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
