import { View, FlatList, TextInput, StyleSheet, Text } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";
import { Icon, ListItem, Input, Button } from '@rneui/themed';


export default function Places({navigation}) {
  const [address, setAddress] = useState('');
  const [addresslist, setAddresslist] = useState([]);
  const db = SQLite.openDatabase('addresslist.db');


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []);
    
    
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresslist (address) values (?);', [address]);
      }, null, updateList);
      setAddress("");
  }
    

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
        setAddresslist(rows._array)
      );
    }, null, null);
  }
    

  const deleteItem = (id) => {
    db.transaction(
      tx => tx.executeSql('delete from addresslist where id = ?;', [id]), null, updateList);
  }


  return (
    <View>
      <View style={styles.container}>
        <Input
          label='PLACEFINDER'
          style={styles.texts}
          placeholder='Type in address'
          onChangeText={address => setAddress(address)}
          value={address}/>
        <Button raised icon={{name: 'save'}} onPress={saveItem} title="Save" />
      </View>
      <View>
        <Text style={{fontSize: 23, fontWeight: '400'}}>HISTORY</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) =>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.address}</ListItem.Title>
            </ListItem.Content>
            <Text style={styles.icontext}>search</Text>
            <Icon type="material" size={25} color="grey" name="search" onLongPress={() => deleteItem(item.id)} onPress={() => navigation.navigate('Map', {address: {item}})}/>
          </ListItem>}
          data={addresslist}
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
  },
  icontext: {
    fontWeight: "400",
    color: "grey",
    fontSize: 12
  }
});