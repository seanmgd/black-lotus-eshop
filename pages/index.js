import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Layout from '../components/layout'
import { withTranslation } from '../i18n'

const Home = ({ t }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Black Lotus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1>{t('welcome')}</h1>
        </main>
      </div>
    </Layout>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})
export default withTranslation('common')(Home)
