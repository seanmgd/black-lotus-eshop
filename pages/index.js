import Head from 'next/head'
import styles from '../styles/home.module.scss'
import css from '../styles/styles.module.scss'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Black Lotus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={css.example}>Welcome to Black lotus</h1>

          <Link href="/plants/all">
            <a>all plants</a>
          </Link>
        </main>
      </div>
    </Layout>
  )
}
