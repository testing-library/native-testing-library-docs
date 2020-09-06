---
id: example-navigation
title: Navigation
sidebar_label: Navigation
---

### react-navigation v5
```js
// jest.config.js 

// react-native-gesture-handler use native modules, we mock it by using it's build in jestSetup. 
// react-navigations will try to import it's assets, to avoid an error we will mock it by using a custom assets transformer 

module.exports = {
    preset: '@testing-library/react-native',
    setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
        "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
    }
}
```

```js
// assetsTransformer.js 
// see https://jestjs.io/docs/en/webpack.html#handling-static-assets
const path = require('path')

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  },
}
```

```js
import React from 'react';
import { Button, Text, View } from 'react-native';
import {NavigationContainer, useNavigationState} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {fireEvent, render, wait} from '@testing-library/react-native'

const Home = ({ navigation }) => (
  <View>
    <Text testID="title">Home page</Text>
    <Button title="About page" onPress={() => navigation.navigate('About')} />
  </View>
);
const About = ({ navigation }) => (
  <View>
    <Text testID="title">About page</Text>
    <Button title="About page" onPress={() => navigation.navigate('Home')} />
  </View>
);
const Location = () => (
  <View>
    <Text testID="title">Location page</Text>
    <LocationDisplay />
  </View>
);

const LocationDisplay = (() => {
  const routeName = useNavigationState(state => state.routes[state.index].name);
  return (
    <Text testID="location-display">{routeName}</Text>
  )
});

const Stack = createStackNavigator()

const renderWithNavigation = ({ screens = {}, navigatorConfig = {} } = {})=>
  render(<NavigationContainer>
    <Stack.Navigator {...navigatorConfig}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Location" component={Location} />
      {
        Object.keys(screens).map(name=> <Stack.Screen key={name} name={name} component={screens[name]} />)
      }
    </Stack.Navigator>
  </NavigationContainer>)

test('full app rendering/navigating', () => {
  const { findByText, getByTestId, getByText } = renderWithNavigation({screens: {About}});
  expect(getByTestId('title').props.children).toMatch('Home page');
  fireEvent.press(getByText(/About page/i));
  expect(findByText('About page')).toBeTruthy();
});

test('rendering a component that uses withNavigation', async () => {
  const initialRouteName = 'Location';
  const { getByTestId } = renderWithNavigation({
    navigatorConfig: { initialRouteName },
  });
  await wait(()=> expect(getByTestId('location-display').props.children).toBe(initialRouteName));
});
```

### react-navigation v4

```js
// <project-root-path>/__mocks__/react-native-gesture-handler.js
// react-native-gesture-handler use native modules, we need to mock it. 
import { View } from 'react-native';

export const State = {};
export const PanGestureHandler = View;
export const BaseButton = View;
export const Directions = {};
```

```javascript
import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

import { render, fireEvent } from '@testing-library/react-native';

// NativeAnimatedHelper is not mocked by default on react native's jest setup file.
jest.mock('NativeAnimatedHelper');

console.warn = arg => {
  const hiddenMessages = [
    'Calling .measureInWindow()',
    'Calling .measureLayout()',
    'Calling .setNativeProps()',
    'Calling .focus()',
    'Calling .blur()',
  ];

  const warningShouldBeHidden = hiddenMessages.some(x => arg.includes(x))

  if (!warningShouldBeHidden) {
    console.warn(arg);
  }
};

const Home = ({ navigation }) => (
  <View>
    <Text testID="title">Home page</Text>
    <Button title="About page" onPress={() => navigation.navigate('About')} />
  </View>
);
const About = ({ navigation }) => (
  <View>
    <Text testID="title">About page</Text>
    <Button title="About page" onPress={() => navigation.navigate('Home')} />
  </View>
);
const Location = () => (
  <View>
    <Text testID="title">Location page</Text>
    <LocationDisplay />
  </View>
);

const LocationDisplay = withNavigation(({ navigation }) => (
  <Text testID="location-display">{navigation.state.routeName}</Text>
));

function renderWithNavigation({ screens = {}, navigatorConfig = {} } = {}) {
  const AppNavigator = createStackNavigator(
    {
      Home,
      About,
      Location,
      ...screens,
    },
    { initialRouteName: 'Home', ...navigatorConfig },
  );

  const App = createAppContainer(AppNavigator);

  return { ...render(<App />), navigationContainer: App };
}

test('full app rendering/navigating', async () => {
  const { findByText, getByTestId, getByText } = renderWithNavigation();
  expect(getByTestId('title').props.children).toMatch('Home page');
  fireEvent.press(getByText(/About page/i));
  await expect(findByText('About page')).toBeTruthy();
});

test('rendering a component that uses withNavigation', () => {
  const initialRouteName = 'Location';
  const { getByTestId } = renderWithNavigation({
    navigatorConfig: { initialRouteName },
  });
  expect(getByTestId('location-display').props.children).toBe(initialRouteName);
});
```
