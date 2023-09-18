
import React, { useEffect, useState } from 'react';
import {View} from 'react-native';



 
export default function HomeScreen() {


      

    return (
      <View>
        <MapView 
          style={{
            flex: 1,
            height: '100%',
            width: '100%'
          }}
          initialRegion={initial}
          region={initial}
          >
            <Marker 
              coordinate={{
                latitude: 60.200692,
                longitude: 24.934302
              }}
              title="Haaga-Helia"
              description="ammattikorkeakoulu"
           />
          </MapView>
      </View>
      );
    }


    
