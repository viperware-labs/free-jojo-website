import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
import { Minter } from '../components'
import { FAQ } from '../components'

function Page() {
  const { isConnected } = useAccount()
  return (
    <div className={styles.background}>
      <Head>
        <title>COLOR x Ownrshp</title>
        <meta name="description" content="COLOR x Ownrshp" key="desc" />
        <meta property="og:title" content="COLOR x Ownrshp" />
        <meta
          property="og:description"
          content="COLOR x Ownrshp"
        />
        <meta
          property="og:image"
          content="https://www.galaxyofcolor.xyz/_next/static/media/WEB_BACKGROUND1.29cfa715.jpg"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="flex p-5">
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>
      <div className={styles.main}
        style={{
          
          fontFamily: 'Wave',
          fontWeight: '300'
        
        }}
        >
        <Minter />
        <FAQ />
      </div>
    </div>
  )
}

export default Page
