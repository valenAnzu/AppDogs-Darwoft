import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DogsListScreen from './DogsListScreen';
import DogDetailScreen from './DogDetailScreen';

export type HomeStackParams = {
  DogsList: undefined,
  DogDetail: { dogId: number },
}

export type HomeStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParams>,
  NavigationProp<HomeStackParams>
>;

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStack = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
      <Stack.Navigator
        initialRouteName={'DogsList'}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#86f6ff',
          },
          headerTitleStyle: {
            color: 'black',
          },
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="DogsList" component={DogsListScreen} options={{ title: 'Dogs List' }} />
        <Stack.Screen name="DogDetail" component={DogDetailScreen} options={{ title: 'Dog Detail' }} />
       
      </Stack.Navigator>
    </SafeAreaView>
  );
}