'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { showGlobalToast } from '@/components/toast/toast-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError(error) {
        const errorMessage = error instanceof Error ? error.message : '请求发生错误';
        showGlobalToast(errorMessage, 'error');
        return false;
      },
    },
    mutations: {
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : '操作发生错误';
        showGlobalToast(errorMessage, 'error');
      },
    },
  },
});

export function QueryClientWrapProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
