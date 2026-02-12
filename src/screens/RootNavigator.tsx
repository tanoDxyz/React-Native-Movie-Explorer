// RootNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MovieDetailsScreen } from './MovieDetailsScreen';
import { BottomNavigationBar } from '../App';

export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: 'Movie Details',headerBackTitle:"Back",headerShown:false }}
      />
    </Stack.Navigator>
  );
}
