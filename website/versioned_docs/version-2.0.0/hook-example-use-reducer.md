---
id: version-2.0.0-hook-example-use-reducer
title: useReducer Hook
sidebar_label: useReducer Hook
original_id: hook-example-use-reducer
---

```javascript
import { useReducer } from 'react';

import { renderHook } from '../../';

test('should handle useReducer hook', () => {
  const reducer = (state, action) => (action.type === 'inc' ? state + 1 : state);
  const { result } = renderHook(() => useReducer(reducer, 0));

  const [initialState, dispatch] = result.current;

  expect(initialState).toBe(0);

  dispatch({ type: 'inc' });

  const [state] = result.current;

  expect(state).toBe(1);
});
```
