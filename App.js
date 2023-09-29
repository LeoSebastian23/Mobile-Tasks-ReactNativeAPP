import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AddTask from "./screens/addTask";
import Home from "./screens/home";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name= 'Home'
        component ={Home}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name= 'Add'
        component ={AddTask}
        options={{presentation:'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


