// Minimal subset of React's public types — see README.md in this folder.
declare module 'react' {
  export type ReactNode = ReactElement | string | number | bigint | boolean | null | undefined | Iterable<ReactNode>;
  export interface ReactElement {
    type: unknown;
    props: unknown;
    key: string | null;
  }
  export type Key = string | number;
  export interface RefObject<T> {
    current: T;
  }
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prev: S) => S);
  export function useState<S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useRef<T>(initial: T): RefObject<T>;
  export function useRef<T>(initial: T | null): RefObject<T | null>;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useCallback<T extends (...args: never[]) => unknown>(fn: T, deps: readonly unknown[]): T;
  export function useId(): string;
  export function useSyncExternalStore<T>(subscribe: (cb: () => void) => () => void, getSnapshot: () => T, getServerSnapshot?: () => T): T;
  export const Fragment: (props: { children?: ReactNode }) => ReactElement;
  export const StrictMode: (props: { children?: ReactNode }) => ReactElement;
  export type CSSProperties = Record<string, string | number | undefined>;
  export interface SyntheticEvent<T = Element> {
    target: EventTarget;
    currentTarget: T;
    preventDefault(): void;
    stopPropagation(): void;
  }
  export type MouseEvent<T = Element> = SyntheticEvent<T>;
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
  export namespace JSX {
    type Element = import('react').ReactElement;
    interface IntrinsicAttributes {
      key?: import('react').Key;
    }
    interface IntrinsicElements {
      [tag: string]: {
        children?: import('react').ReactNode;
        ref?: unknown;
        key?: import('react').Key;
        className?: string;
        style?: import('react').CSSProperties;
        onClick?: (e: import('react').MouseEvent<HTMLElement>) => void;
        onChange?: (e: import('react').ChangeEvent<HTMLInputElement>) => void;
        onMouseDown?: (e: import('react').MouseEvent<HTMLElement>) => void;
        onError?: () => void;
        [attr: string]: unknown;
      };
    }
    interface ElementChildrenAttribute {
      children: object;
    }
  }
}

declare module 'react-dom/client' {
  export function createRoot(el: Element): { render(node: import('react').ReactNode): void; unmount(): void };
}

declare module '*.css';
