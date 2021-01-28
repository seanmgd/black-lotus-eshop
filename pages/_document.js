import Document, { Html, Head, Main, NextScript } from 'next/document'
import Layout from '../components/layout'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            src={
              'https://www.paypal.com/sdk/js?client-id=ATTB6JDVMM88j6FuL3d2Cwu90pdFfZ0H0ld6k0zFs5-KjzUUhVhQtsvSeFu2reunprGz7X_3WayK5HII&currency=EUR'
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
