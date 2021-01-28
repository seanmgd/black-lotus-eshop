import { useLocalStorage } from '@ttrmz/react-utils'
import React from 'react'

const LOCAL_STORAGE_CART_KEY = 'black_lotus_cart'
const LOCAL_STORAGE_CART_INITIAL_STATE = []

const CartContext = React.createContext({})

export function useCartContext() {
  return React.useContext(CartContext)
}

export function CartContextProvider({ value, ...rest }) {
  const [cart, setCart] = useLocalStorage(
    LOCAL_STORAGE_CART_KEY,
    LOCAL_STORAGE_CART_INITIAL_STATE,
  )

  const clearCart = React.useCallback(() => {
    setCart(LOCAL_STORAGE_CART_INITIAL_STATE)
  }, [setCart])

  const updateCart = React.useCallback(
    (product) => {
      setCart((prev) => {
        const [alreadyStoredProduct] = prev.filter(
          ({ id }) => id === product.id,
        )

        if (!!alreadyStoredProduct) {
          return updateProductFormCart(prev, product) // update already existing product from cart
        }

        return [...prev, product] // add new product to cart
      })
    },
    [setCart],
  )

  const values = React.useMemo(
    () => ({
      cart,
      updateCart,
      clearCart,
    }),
    [cart, updateCart, clearCart],
  )

  return <CartContext.Provider value={values} {...rest} />
}

function updateProductFormCart(cart, product) {
  return cart.reduce((acc, curr) => {
    if (product.id === curr.id) {
      if (Math.sign(product.qty) === 0) {
        return acc
      }
      return [...acc, product]
    }

    return [...acc, curr]
  }, [])
}
