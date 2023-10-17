import { View, FlatList, TextInput, StyleSheet, Text } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";
import { Header,  Icon, ListItem, Input, Button } from '@rneui/themed';



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
      }, null, updateList);
      setProduct("");
      setAmount("");
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
    <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={styles.container}>
        <Input
          label='PRODUCT'
          style={styles.texts}
          placeholder='Product'
          onChangeText={product => setProduct(product)}
          value={product}/>
        <Input
          label='AMOUNT'
          style={styles.texts}
          placeholder='Amount'
          onChangeText={amount => setAmount(amount)}
          value={amount}/>
        <Button raised icon={{name: 'save'}} onPress={saveItem} title="Save" />
      </View>
      <View>
        <Text style={{fontSize: 23, fontWeight: '400'}}>Shopping list</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.product}</ListItem.Title>
              <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon type="material" size={15} reverse color="red" name="delete" onPress={() => deleteItem(item.id)} />
          </ListItem>}
          data={shoppinglist}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts: {
    marginTop: 5,
    width: 200,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5
  }
});