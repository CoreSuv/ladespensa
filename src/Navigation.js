import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Add from "./screens/Add";
import Recipes from "./screens/Recipes";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Home} />
      <Stack.Screen 
        name="Add" 
        component={Add} 
      />
      <Stack.Screen
        name="Recetas"
        component={Recipes}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

