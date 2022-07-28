import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test SSR App by Simao Nziaka</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>
        Test SSR App by Simao Nziaka
      </h1>
      <h2>
        <Link href="/test/jobs">Go</Link>
      </h2>
    </div>
  )
}

export default Home
