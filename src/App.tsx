// App.tsx
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import strings from './assets/strings.json';
import dimens from './assets/dimens.json';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';

import { NavigationContainer, useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HugeiconsIcon } from '@hugeicons/react-native';
import { HomeIcon, SearchIcon, HeartCheckIcon, Home01Icon, Home03Icon } from '@hugeicons/core-free-icons';
import { RootNavigator } from './screens/RootNavigator';




type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Search: undefined;
};

const MyTabs = createBottomTabNavigator<TabParamList>();

function MyTabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 60 }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        // Choose icon per tab
        let IconComponent = HomeIcon;
        if (route.name === 'Home') IconComponent = Home03Icon;
        else if (route.name === 'Search') IconComponent = SearchIcon;
        else if (route.name === 'Favorites') IconComponent = HeartCheckIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as keyof TabParamList, route.params);
          }
        };

        return (
          <PlatformPressable
            key={route.key}
            onPress={onPress}
            href={buildHref(route.name, route.params)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <HugeiconsIcon
              icon={IconComponent}
              size={22}
              color={isFocused ? colors.primary : '#777'}
            />
            <Text style={{
              marginTop: 2,
              fontSize: 12,
              color: isFocused ? colors.primary : '#777',
            }}>
              {route.name}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
// BottomNavigationBar.tsx




export function BottomNavigationBar() {
  return (
    <MyTabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <MyTabBar {...props} />}
      backBehavior="history">
      <MyTabs.Screen name="Home" component={HomeScreen} />
      <MyTabs.Screen name="Search" component={SearchScreen} />
      <MyTabs.Screen name="Favorites" component={FavoritesScreen} />
    </MyTabs.Navigator>
  );
}

// function BottomNavigationBar() {
//   return (
//     <MyTabs.Navigator
//       tabBar={(props) => <MyTabBar {...props} />}
//       backBehavior="history"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <MyTabs.Screen name="Home" component={HomeScreen} />
//       <MyTabs.Screen name="Favorites" component={FavoritesScreen} />
//       <MyTabs.Screen name="Search" component={SearchScreen} />
//     </MyTabs.Navigator>
//   );
// }

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AppContent(): React.JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top + (dimens.PaddingScreenGeneral ?? 0),
          paddingBottom: safeAreaInsets.bottom,
          paddingRight: safeAreaInsets.right + (dimens.PaddingScreenGeneral ?? 0),
          paddingLeft: safeAreaInsets.left + (dimens.PaddingScreenGeneral ?? 0),
        },
      ]}
    >
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
