import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/pdfjs-dist@3.6.210/build/pdf.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
        {/* Other meta tags */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
