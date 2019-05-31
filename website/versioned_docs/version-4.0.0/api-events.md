---
id: version-4.0.0-api-events
title: Firing Events
sidebar_label: Firing Events
original_id: api-events
---

## Basic example

```javascript
import { fireEvent, NativeTestEvent, render } from '@testing-library/react-native';

const { getByText } = render(<Button title="Submit" />);
fireEvent(getByText(container, 'Submit'), new NativeTestEvent('press'));
```

## `fireEvent[eventName]`

```typescript
fireEvent[eventName](node: FiberRoot, eventProperties: NativeTestEvent)
```

Convenience methods for firing events. Check out
[src/events.js](https://github.com/testing-library/native-testing-library/blob/master/src/events.js)
for a full list as well as `validTargets` for every event type.

```javascript
import { fireEvent, render } from '@testing-library/react-native';

const { getByText } = render(<Button title="Submit" />);
fireEvent.press(getByText('Submit'));
```

**nativeEvent**: React Native tends to put everything relevant to their built-in events on an object
called nativeEvent. When you fire an event using this library, you will have to build a mock event
config. You will use this particularly for events like a change event:

```javascript
fireEvent.change(getByLabelText(/username/i), { nativeEvent: { text: 'a' } });
```

**changeText**: `Text` has a method for value updating called `onChangeText`. Since this is such a
commonly used method, there is a special case in the library for this method.

```javascript
fireEvent.changeText(getByLabelText(/username/i), 'a');
```

**customEvent**: You may be using a library that has custom event listeners that you want to be able
to fire. This is how you would fire one of these events:

```javascript
fireEvent(
  getByTestId('swiper'),
  new NativeTestEvent('myEvent', { nativeEvent: { value: 'testing' } }),
);
```
