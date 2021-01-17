import Head from 'next/head'
import styles from '../../styles/all.module.scss'
import Card from '../../components/card'
import Layout from '../../components/layout'
import { useApollo } from '../../lib/apolloClient'
import { ALL_PLANTS_QUERY } from '../api/gql/queries'

export default function All({ products }) {
  return (
    <Layout>
      <Head>
        <title>All plants</title>
      </Head>
      <section className={styles.products}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const apolloClient = useApollo()

  const { data } = await apolloClient.query({
    query: ALL_PLANTS_QUERY,
  })

  return {
    props: {
      products: data.products,
    },
  }
}
