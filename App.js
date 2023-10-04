import { View, FlatList, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import * as Speech from 'expo-speech';


export default function App() {
  const [text, setText] = useState();


  const speak = () => {
    Speech.speak(text);
  };
    

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texts}
        placeholder="Write your text here"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button title="LETS HEAR IT" onPress={speak} />
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
  texts: {
    marginTop: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  listcontainer: {
    flexDirection: "row"
  }
});


