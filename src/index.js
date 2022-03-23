import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from './screens/Search';
import Result from './screens/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={Search}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Result"
          component={Result}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
