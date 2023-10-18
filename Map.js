import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Map({ route }) {
    const {address} = route.params;
    const [longitude, setLongitude] = useState(24.934302);
    const [latitude, setLatitude] = useState(60.200692);
    const API_KEY = "404";
    const [marker, setMarker] = useState(false);

    const getPlace = () => {
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${address.item.address}`)
        .then(response => response.json())
        .then(data => {
            setLatitude(data.results[0].locations[0].latLng.lat),
            setLongitude(data.results[0].locations[0].latLng.lng)
            setMarker(true);
        })
    };


    const coordinates = {
        latitude: latitude,
        longitude: longitude
    }


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
            {marker && <Marker
                coordinate={coordinates}
                title='HERE'
            />}
            </MapView>
            <Button onPress={getPlace} title='SHOW' />
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