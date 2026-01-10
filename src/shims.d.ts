// Minimal ambient type shims for environments where `node_modules` is not installed.
// These keep the editor/TS server functional, but do not replace real dependencies.

declare module '*.css' {
  const content: string
  export default content
}

declare module 'vite/client' {}

declare module 'react' {
  export type ReactNode = any
  export type CSSProperties = any
  export type FormEvent<T = any> = any
  export type ChangeEvent<T = any> = any
  export type MouseEvent<T = any> = any

  export function useState<S>(
    initialState: S | (() => S)
  ): [S, (value: S | ((prevState: S) => S)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T
  export function useRef<T>(initialValue: T): { current: T }
  export function useId(): string

  const React: any
  export default React
}

declare module 'react/jsx-runtime' {
  export const Fragment: any
  export const jsx: any
  export const jsxs: any
}

declare module 'react-dom/client' {
  export const createRoot: any
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
