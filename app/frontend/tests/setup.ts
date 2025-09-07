import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Runs a cleanup after each test case to unmount React components
afterEach(() => {
  cleanup();
});
