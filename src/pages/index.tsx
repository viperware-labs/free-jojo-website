import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
import { Minter } from '../components'

import Image from 'next/image';
import JoJoList from '../../public/images/JoJoList.png'

import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

function Page() {
  const { isConnected } = useAccount()
  return (
    <div className="h-screen overflow-hidden">
      <div className={styles.background}>
        <Head>
          <title>Free JoJo</title>
          <meta name="description" content="COLOR x Ownrshp" key="desc" />
          <meta property="og:title" content="COLOR x Ownrshp" />
          <meta
            property="og:description"
            content="COLOR x Ownrshp"
          />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <div className="p-5 flex">
          <div className="">
            <ConnectButton />
          </div>
          <div className="ml-auto">
            <Image
              alt="JoJo List"
              height={90}
              src={JoJoList}
            // className="border"
            />
          </div>
        </div>
        <div className={styles.main}
          style={{

            fontFamily: 'Wave',
            fontWeight: '300'

          }}
        >
          <Minter />
        </div>
      </div>
    </div>
  )
}

export default Page
