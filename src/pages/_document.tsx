// import { getCssText } from 'lib';
import { Html, Main, NextScript, Head } from 'next/document';

const Document = () => {
  return (
    <Html className="h-full antialiased bg-black dark" lang="en">
      <Head />
      <body className="flex flex-col h-full bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
