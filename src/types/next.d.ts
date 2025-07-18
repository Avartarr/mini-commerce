import 'next';

declare module 'next' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[]>;
  }
}