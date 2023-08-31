import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [textone, setTextone] = useState('');
  const [texttwo, setTexttwo] = useState('');
  const [answer, setAnswer] = useState();
  const [operator, setOperator] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (answer !== undefined) {
      let text = textone + " " + operator + " "  + texttwo + " = " + answer;
      setData([...data, { key: text }]);
      setTextone("");
      setTexttwo("");
    } 
  }, [answer])

  const add = () => {
    setAnswer(parseInt(textone) + parseInt(texttwo));
    setOperator("+");
  }

  const unadd = () => {
    setAnswer(parseInt(textone) - parseInt(texttwo));
    setOperator("-");
  }

  return (
    <View style={styles.container}>
      <Text>Result: {answer}</Text>
      <TextInput keyboardType='numeric' style={styles.input} onChangeText={textone => setTextone(textone)} value={textone} />
      <TextInput keyboardType='numeric' style={styles.inputtwo} onChangeText={texttwo => setTexttwo(texttwo)} value={texttwo} />
      <View style={styles.buttons}>
        <Button onPress={add} title="+" />
        <Button onPress={unadd} title="-" />
      </View>
      <Text>History</Text>
      <FlatList style={styles.list}
        data={data}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginTop: 100
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputtwo: {
    marginTop: 0,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 90,
    marginTop: 30,
    marginBottom: 50
    }
});
