import React from 'react'
import { useCartContext } from '../contexts/cartContext'
import Link from 'next/link'
import styles from '../styles/cart.module.scss'
import { withTranslation } from '../i18n'

function CartItem({ t, product }) {
  const { updateCart } = useCartContext()
  console.log(product)

  const handleUpdateQty = (product, incrementNumber) => {
    updateCart({
      ...product,
      qty: String(parseInt(product.qty) + incrementNumber),
    })
  }
  return (
    <ul key={product.id}>
      <li>
        <Link href={`/plants/${product.name}`}>
          <img src={product.image} className={styles.cartImage} />
        </Link>
      </li>

      <li>
        <Link href={`/plants/[slug]`} as={`/plants/${product.name}`}>
          {product.name}
        </Link>
      </li>

      <li>{product.price} €</li>

      <li>
        {t('qty')}: {product.qty}
      </li>

      <li>Total: {product.price * product.qty} €</li>

      <div className={styles.cartItemActions}>
        <button onClick={() => handleUpdateQty(product, 1)}>+</button>

        <button onClick={() => handleUpdateQty(product, -1)}>-</button>
      </div>
    </ul>
  )
}

export default withTranslation('common')(CartItem)
