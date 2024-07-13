/*
 * File: _document.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 30 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{__html: `${process.env.NEXT_GOOGLE_TAG_MGR_SCRIPT}`}}></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=optional"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <body>
          <noscript dangerouslySetInnerHTML={{__html: `${process.env.NEXT_GOOGLE_TAG_MGR_NOSCRIPT}`}}></noscript>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{__html: `${process.env.NEXT_GOOGLE_ANALYTICS_SCRIPT}`}}></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
