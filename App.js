import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';





export default function App() {
  const [numberone, setNumberone] = useState();
  const [numbertwo, setNumbertwo] = useState();
  const [answer, setAnswer] = useState();

  const add = () => {
    setAnswer(parseInt(numberone) + parseInt(numbertwo));
  }

  const unadd = () => {
    setAnswer(parseInt(numberone) - parseInt(numbertwo));
  }


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Result: {answer}</Text>
      <View>
        <TextInput keyboardType='numeric' placeholder='Number' style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={numberone => setNumberone(numberone)} value={numberone} />
        <TextInput keyboardType='numeric' placeholder='Number' style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={numbertwo => setNumbertwo(numbertwo)} value={numbertwo} />

      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Button onPress={add} title="+" />
        <Button onPress={unadd} title="-" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
