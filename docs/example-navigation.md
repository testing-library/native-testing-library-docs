---
id: example-navigation
title: Navigation
sidebar_label: Navigation
---


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
