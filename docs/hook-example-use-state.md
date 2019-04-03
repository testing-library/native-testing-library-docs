---
id: hook-example-useState
title: useState Hook
sidebar_label: useState Hook
---

```javascript
import { useState } from 'react';

import { renderHook } from '../../';

test('should use setState value', () => {
  const { result } = renderHook(() => useState('foo'));

  const [value] = result.current;

  expect(value).toBe('foo');
});

test('should update setState value using setter', () => {
  const { result } = renderHook(() => useState('foo'));

  const [_, setValue] = result.current;

  setValue('bar');

  const [value] = result.current;

  expect(value).toBe('bar');
});
```
