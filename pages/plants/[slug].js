import React from 'react'
import { useRouter } from 'next/router'
import { useApollo } from '../../lib/apolloClient'
import { ALL_PLANTS_QUERY, SINGLE_PLANT_QUERY } from '../api/gql/queries'
import styles from '../../styles/product.module.scss'
import { useCartContext } from '../../contexts/cartContext'
import Link from 'next/link'
import { withTranslation } from '../../i18n'

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

const Plant = ({ t, product }) => {
  const router = useRouter()
  const { updateCart } = useCartContext()
  const [showCart, setShowCart] = React.useState(false)

  const cartHandler = (event) => {
    event.preventDefault()
    setShowCart(!showCart)
    updateCart({
      id: product.id,
      slug: product,
      qty: 1,
      image: product.image,
      name: product.name,
      price: product.price,
    })
  }
  console.log(product)
  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return (
      <div className={styles.product}>
        <div className={styles.productImageContainer}>
          <img className={styles.productImage} src={product.image} />
        </div>
        <div className={styles.productInformationContainer}>
          <h1>
            {product.name}
            <span>{product.family}</span>
          </h1>
          <h3>{product.price} €</h3>
          <ul>
            <li>
              {t('diameter')}: {product.diameter}
            </li>
            <li>
              {t('size')}: {product.height}
            </li>
            <li>
              {t('level')}: {product.level}
            </li>
            <li>
              {t('pet_friendly')}: {product.pet_friendly ? 'OK' : 'No'}
            </li>
            {product.advantage !== null && (
              <li>
                {t('advantage')}: {product.advantage}
              </li>
            )}
            {product.sun !== null && (
              <li>
                {t('sun')}:
                <span className={styles.sun}>
                  {product.sun.replace(/[\[\"\]']+/g, '')}
                </span>
              </li>
            )}
          </ul>
          {showCart && (
            <div className={styles.toast}>
              {t('product_added')}
              <Link href="/cart">{t('see_cart')}</Link>
            </div>
          )}
          <button className={styles.button} onClick={cartHandler}>
            {t('add_cart')}
          </button>
        </div>
      </div>
    )
  }
}

export default withTranslation('common')(Plant)
