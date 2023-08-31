import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);


  const add = () => {
    setData([...data, { key: text }]);
    setText("");
  }

  const clear = () => {
    setData([]);
    setText("");
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      <View style={styles.buttons}>
        <Button onPress={add} title="ADD" />
        <Button onPress={clear} title="CLEAR" />
      </View>
      <Text style={styles.title}>Shopping List</Text>
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
    },
    title: {
      fontSize: 18,
      color: "#0000FF",
      fontWeight: "bold"
    }
});
