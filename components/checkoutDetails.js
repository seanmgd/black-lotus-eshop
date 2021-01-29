import React from 'react'
import styles from '../styles/checkout.module.scss'

export default function CheckoutDetails({
  productName,
  productPrice,
  productQty,
  children,
}) {
  return (
    <div className={styles.checkoutRowDetails}>
      {productName && productQty && (
        <span>
          {productName} x {productQty}
        </span>
      )}
      {productPrice && <span>{productPrice} €</span>}
      {children}
    </div>
  )
}
