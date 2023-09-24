import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [address, setAdress] = useState('');
  const [longitude, setLongitude] = useState(24.934302);
  const [latitude, setLatitude] = useState(60.200692);
  const API_KEY = "404";
  

  useEffect(() => (async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude)
    console.log('Location:', location.coords.latitude)
  })(), []);

  const getPlace = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${address}`)
    .then(response => response.json())
    .then(data => {
      console.log("LATITUDE:" + data.results[0].locations[0].latLng.lat)
      console.log("LONGITUDE:" + data.results[0].locations[0].latLng.lng)
      console.log("current latitude: " + latitude)
      setLatitude(data.results[0].locations[0].latLng.lat),
      setLongitude(data.results[0].locations[0].latLng.lng)
    })
  }
  const coordinates = {
    latitude: latitude,
    longitude: longitude
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={coordinates}
          title='HERE'
        />
      </MapView>
      <TextInput value={address} onChangeText={address => setAdress(address)} />
      <Button onPress={getPlace} title='FIND IT' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});


