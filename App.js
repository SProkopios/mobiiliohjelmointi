import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Map';
import Places from './Places';


export default function App() {
  const Stack = createNativeStackNavigator();



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Places" component={Places} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
    );



}