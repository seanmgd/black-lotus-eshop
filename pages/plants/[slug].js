import { useRouter } from 'next/router'
import { useApollo } from '../../lib/apolloClient'
import { ALL_PLANTS_QUERY, SINGLE_PLANT_QUERY } from '../api/gql/queries'
import styles from '../../styles/product.module.scss'
import { useCartContext } from '../../contexts/cartContext'

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

export default function Plants({ t, product }) {
  const router = useRouter()
  const { updateCart } = useCartContext()

  const cartHandler = (event) => {
    event.preventDefault()
    updateCart({
      id: product.id,
      slug: product,
      qty: 1,
      image: product.image,
      name: product.name,
      price: product.price,
    })
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return (
      <div className={styles.product}>
        <div className={styles.productImageContainer}>
          <img className={styles.productImage} src={product.image} />
        </div>
        <div className={styles.productInformationContainer}>
          <p>☘ {product.name}</p>
          <p>€{product.price}</p>
          <ul>
            <li>Diamétre: {product.diameter}</li>
            <li>Taille à maturité: {product.height}</li>
            <li>Entretien: {product.level}</li>
          </ul>
          <button className={styles.button} onClick={cartHandler}>
            Ajouter au panier
          </button>
        </div>
      </div>
    )
  }
}
