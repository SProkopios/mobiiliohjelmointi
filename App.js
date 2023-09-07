import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Caculator" component={HomeScreen} />
      <Stack.Screen name="History" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
