import { View, FlatList, TextInput, Button, StyleSheet, Text } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";


export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [shoppinglist, setShoppinglist] = useState([]);
  const db = SQLite.openDatabase('shoppinglistdb.db');


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, amount text, product text);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []);
    
    
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (amount, product) values (?, ?);',
        [amount, product]);
      }, null, updateList)
  }
    
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setShoppinglist(rows._array)
      );
    }, null, null);
  }
    
  const deleteItem = (id) => {
    db.transaction(
      tx => tx.executeSql('delete from shoppinglist where id = ?;', [id]), null, updateList);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texts}
        placeholder='Product'
        onChangeText={product => setProduct(product)}
        value={product}/>
      <TextInput
        style={styles.texts}
        placeholder='Amount'
        onChangeText={amount => setAmount(amount)}
        value={amount}/>
      <Button onPress={saveItem} title="Save" />
      <Text>Shopping list</Text>
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
        <View style={styles.listcontainer}>
          <Text>{item.product}, {item.amount} </Text>
          <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>Bought</Text>
        </View>}
        data={shoppinglist}
      />
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


