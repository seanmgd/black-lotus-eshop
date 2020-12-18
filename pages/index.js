import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({products}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Black lotus
        </h1>

        {products.map(product => (
            <span key={product.id}>{product.name}</span>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps () {
  const request = await fetch('https://exoticplant.vercel.app/public/api/products')
  const json = await request.json()
  return {
    props: {
      products: json
    }
  }
}