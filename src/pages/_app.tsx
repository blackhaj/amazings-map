import type { AppProps } from 'next/app';

import 'focus-visible';
import '~/styles/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center dark sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
