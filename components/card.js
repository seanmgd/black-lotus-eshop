import styles from './card.module.scss'
import Link from 'next/link'

export default function Card({ product }) {
  return (
    <div className={styles.card}>
      <Link href={`/plants/[slug]`} as={`/plants/${product.slug}`}>
        <div className={styles.imageContainer}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          />
        </div>
      </Link>
      <div className={styles.infos}>
        <Link href={`/plants/[slug]`} as={`/plants/${product.slug}`}>
          {product.name}
        </Link>
        <span>{product.price}€</span>
      </div>
    </div>
  )
}
