import '../styles/globals.scss'
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Layout from '../components/layout'

const MyApp = ({ Component, pageProps }) => {
    const apolloClient = useApollo();
    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
        );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
