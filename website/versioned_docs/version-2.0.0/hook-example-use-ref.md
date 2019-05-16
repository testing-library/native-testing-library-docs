---
id: version-2.0.0-hook-example-use-ref
title: useRef Hook
sidebar_label: useRef Hook
original_id: hook-example-use-ref
---

```javascript
import { useRef, useImperativeHandle } from 'react';

import { renderHook } from '../../';

test('should handle useRef hook', () => {
  const { result } = renderHook(() => useRef());

  const refContainer = result.current;

  expect(Object.keys(refContainer)).toEqual(['current']);
  expect(refContainer.current).toBeUndefined();
});

test('should handle useImperativeHandle hook', () => {
  const { result } = renderHook(() => {
    const ref = useRef();
    useImperativeHandle(ref, () => ({
      fakeImperativeMethod: () => true,
    }));
    return ref;
  });

  const refContainer = result.current;

  expect(refContainer.current.fakeImperativeMethod()).toBe(true);
});
```
