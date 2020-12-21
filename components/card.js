import styles from '../styles/card.module.scss'
import Link from 'next/link'

export default function Card({ product }) {
  return (
    <div className={styles.card}>
      <Link href={`/plants/[slug]`} as={`/plants/${product.slug}`}>
        <div className={styles.cardContainer}>
          <div className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${product.image})`,
              }}
            />
          </div>
          <div className={styles.infos}>
            {product.name}
            <span>{product.price}€</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
