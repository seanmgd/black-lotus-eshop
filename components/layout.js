import styles from '../styles/layout.module.scss'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  )
}
