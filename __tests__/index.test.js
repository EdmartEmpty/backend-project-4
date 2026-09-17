import { test, expect } from '@jest/globals'
import sayHi from '../index.js'

test('test sayHi', () => {
  expect(sayHi()).toBe('Hi')
})
