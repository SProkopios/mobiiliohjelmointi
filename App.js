import { View, FlatList, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import * as Contacts from 'expo-contacts';


export default function App() {
  const [contact, setContact] = useState();


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
      }
    }
  };
    




  return (
    <View style={styles.container}>
      <FlatList
        data={ contact }
        renderItem={({ item }) => 
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
        }
      />
      <Button title="Get Contact" onPress={getContacts} />
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


