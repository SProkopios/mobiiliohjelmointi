
import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


//Tämä näytti toimivan ilman Object.keys() 
export default function HomeScreen() {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState([]);
    const [currency, setCurrency] = useState('');
    const API_KEY = "404";

    const requestData = {
      method: 'GET',
      redirect: 'follow',
      headers: {apikey: API_KEY}
    }

    const getRate = () => {
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${currency}&amount=${amount}`, requestData)
      .then(response => response.json())
      .then(data => setRate(data.result))
      .catch(error => {
        Alert.alert('Error', error);
        });
      }

      

    return (
      <View style={{marginTop: 20, marginBottom: 60, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{rate} €</Text>
        <View style={{justifyContent: 'center',flexDirection: 'row'}}>
          <TextInput style={{width: 60}} keyboardType='numeric' value={amount} onChangeText={amount => setAmount(amount)}/>
          <Picker style={{width: 120}} selectedValue={currency} onValueChange={(itemValue, itemIndex) =>
            setCurrency(itemValue)
          }>
            <Picker.Item label="JPY" value="JPY" />
            <Picker.Item label="ARS" value="ARS" />
            <Picker.Item label="TRY" value="TRY" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>
        <Button title="Convert" onPress= {getRate} />
      </View>
      );
    }


    
