import styles from '../styles/layout.module.scss'
import Navbar from './navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  )
}
