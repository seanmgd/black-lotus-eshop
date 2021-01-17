import '../styles/globals.scss'
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { Provider } from 'next-auth/client'

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo()
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
