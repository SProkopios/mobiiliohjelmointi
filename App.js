import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';





export default function App() {
  const [quess, setQuess] = useState();
  const [text, setText] = useState("Guess a number between 1-100");
  const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
  
  const [counter, setCounter] = useState(1);



  const makequess = () => {
    if (quess > answer) { 
      setText("Your quess " + quess + " is too high");
      setCounter(counter + 1);
    } else if (quess < answer) {
      setText("Your quess " + quess + " is too low");
      setCounter(counter + 1);
    }else {
      Alert.alert("You quessed the number in " + counter + " quesses")
    }
  }


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{text}</Text>
      <View>
        <TextInput keyboardType='numeric' placeholder='Number' style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={quess => setQuess(quess)} value={quess} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Button onPress={makequess} title="MAKE QUESS" />
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
