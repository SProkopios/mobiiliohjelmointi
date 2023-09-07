import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


export default function SettingScreen({ route, navigation }) {
    const { data } = route.params;
    return (
    <View style={styles.container} >
        <Text>History</Text>
        <FlatList data={ data } renderItem={({ item }) =>
            <Text>{item.key}</Text>
         }
        keyExtractor={(item, index) => index.toString()}
          />
    </View>
    )
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#ffff',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100
        }}
        );