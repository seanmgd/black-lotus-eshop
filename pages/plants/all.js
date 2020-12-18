import Head from 'next/head'
import styles from './all.module.scss'
import Link from 'next/link'
import Card from '../../components/card'
import Layout from '../../components/layout'

export default function All({ products }) {
  return (
    <Layout>
      <Head>
        <title>All plants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <section className={styles.products}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const request = await fetch(
    'https://exoticplant.vercel.app/public/api/products',
  )
  const json = await request.json()
  return {
    props: {
      products: json,
    },
  }
}
