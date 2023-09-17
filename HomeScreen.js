
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [keyword, setKeyword] = useState('');
    const [repositories, setRepositories] = useState([]);

    const getRepositories = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setRepositories(data.meals))
      .catch(error => {
        Alert.alert('Error', error);
        });
      }
      

    return (
      <View style={{marginTop: 20, marginBottom: 60}}>
      <FlatList
        data={repositories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
        <View>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
          <Image style={{ width: 50, height: 50}} source={{ uri: item.strMealThumb}} />
        </View>}/>
        <TextInput
          style={{fontSize: 18, width: 200}}
          placeholder='keyword'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Find" onPress= {getRepositories} />
      </View>
      );
    }


    
