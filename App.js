import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const jotain = () => {
  Alert.alert("Toimii")
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={jotain} title='Toimiiko?' />
      <Text>TESTI 123</Text>
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
