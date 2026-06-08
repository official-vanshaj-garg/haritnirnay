import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
