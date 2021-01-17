import styles from '../styles/layout.module.scss'
import Navbar from './navbar'

export default function Layout({ noMaxWidth, children }) {
  return (
    <>
      <Navbar navbarNoMaxWidth={noMaxWidth && true} />
      <div
        className={styles.container}
        style={{ maxWidth: noMaxWidth === undefined ? '1600px' : '' }}
      >
        {children}
      </div>
    </>
  )
}
