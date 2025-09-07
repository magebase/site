import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock PointerEvent and related APIs for Radix UI
Object.defineProperty(window, 'PointerEvent', {
  writable: true,
  value: class PointerEvent extends Event {
    constructor(type: string, eventInitDict?: PointerEventInit) {
      super(type, eventInitDict);
    }
  },
});

Object.defineProperty(window.HTMLElement.prototype, 'hasPointerCapture', {
  writable: true,
  value: vi.fn(() => false),
});

Object.defineProperty(window.HTMLElement.prototype, 'setPointerCapture', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, 'releasePointerCapture', {
  writable: true,
  value: vi.fn(),
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock requestAnimationFrame
globalThis.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
globalThis.cancelAnimationFrame = vi.fn(id => clearTimeout(id));

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    setProperty: vi.fn(),
  })),
});

// Mock scrollIntoView
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn(),
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
