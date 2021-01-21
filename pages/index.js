import Head from 'next/head'
import Card from '../components/card'
import Layout from '../components/layout'
import styles from '../styles/home.module.scss'
import { withTranslation } from '../i18n'
import Image from 'next/image'
import React from 'react'
import { ALL_PLANTS_QUERY } from '../pages/api/querys'
import {useApollo} from "../lib/apolloClient";

const Home = ({t, products}) => {
  console.log(products)
  let randomProduct = []
  for (let index = 0; index < 4; index++) {
    const random = Math.floor(Math.random() * products.length)
    randomProduct.push(products[random])
  }
  return (
      <div className={styles.container}>
        <Head>
          <title>Black Lotus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className={styles.homeBanner}>
          <Image
            src="/homebanner.jpg"
            alt="home banner"
            layout="fill"
            objectFit="cover"
          />
          <h1>{t('welcome')}</h1>
        </section>
        <div className={styles.order}>
          <section className={styles.bestSeller}>
            <h2>{t('best_seller')}</h2>
            <div className={styles.cardContainer}>
              {randomProduct.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </section>
          <section className={styles.intro}>
            <div className={styles.leftContainer}>
              <Image
                src="/home-img.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.rightText}>{t('home_message')} 💚</p>
          </section>
        </div>
      </div>
  )
 }

export async function getStaticProps() {

  const apolloClient = useApollo();

  const { data } = await apolloClient.query({
    query: ALL_PLANTS_QUERY,
  });

  return {
    props: {
      products: data.products,
    }
  };
}

export default withTranslation('common')(Home)
