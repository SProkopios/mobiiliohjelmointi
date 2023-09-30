import { View, FlatList, TextInput, Button, StyleSheet, Text } from "react-native";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove, query, collection } from 'firebase/database';
import { useState, useEffect } from "react";
import { getApp, getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


export default function App() {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const database = getDatabase(app);
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const itemsRef = ref(database, "items/");
  //   onValue(itemsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setItems(Object.values(data));
  //   });
  // }, []);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsArray = data ? Object.entries(data).map(([key, value]) => ({ key, ...value })) : [];
      setItems(itemsArray);
    });
  }, []);


  const saveItem = () => {
    push(ref(database, "items/"), { product: product, amount: amount });
    setProduct("");
    setAmount("");
  };

  const deleteItem = (key) => {
    const itemRef = ref(database, `items/${key}`);
    remove(itemRef)
      .then(() => {
        console.log(`Item with key ${key} successfully deleted from Firebase.`);
        setItems(prevItems => prevItems.filter(item => item.key !== key));
      })
      .catch((error) => {
        console.error(`Error deleting item from Firebase: ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texts}
        placeholder="Product"
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        style={styles.texts}
        placeholder="Amount"
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text>Shopping list</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text>
              {item.product}, {item.amount}{" "}
            </Text>
            <Text
              style={{ color: "#0000ff" }}
              onPress={() => deleteItem(item.key)}
            >
              Bought
            </Text>
          </View>
        )}
        data={items}
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


