import { useRouter } from 'next/router'
import { useApollo } from '../../lib/apolloClient'
import { ALL_PLANTS_QUERY, SINGLE_PLANT_QUERY } from '../api/gql/queries'

export async function getStaticPaths() {
  const apolloClient = useApollo()

  const { data } = await apolloClient.query({
    query: ALL_PLANTS_QUERY,
  })

  const paths = data.products.map((product) => ({
    params: { slug: product.slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const apolloClient = useApollo()

  const { data } = await apolloClient.query({
    query: SINGLE_PLANT_QUERY,
    variables: { slug: params.slug },
  })

  return {
    props: {
      product: data.product,
    },
  }
}

export default function Plants({ product }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return <div>{product.name}</div>
  }
}
