import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"
import JoJoList from '../../public/images/JoJoList.png'

import styles from '../../styles/Home.module.css';
import { Minter } from '../components'

import { createClient, useEnsName, useNetwork } from 'wagmi'
import keccupABI from '../abi.json';
import { ethers } from "ethers";
import { keccak256, parseEther } from 'ethers/lib/utils';
import { useContractReads } from 'wagmi';
import { useEffect, useState } from 'react';

import wagmi from 'wagmi'
import SignClient from "@walletconnect/sign-client";

import Image from 'next/image';

import Play from '../../public/images/Play.png'
import ClickHere from '../../public/images/ClickHere.png'

import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { Connect } from '../components/Button'

import MusicPlayer from '../components/Music'

import { Jojo } from '../components/Jojo';
import { Words } from '../components/Words';
import { JojoMobile } from '../components/JojoMobile';
import { WordsMobile } from '../components/WordsMobile';
import { Background } from '../components/Background';
import { WeAreJojo } from '../components/WeAreJojo';
import Modal from '../components/Modal';

import { useSession } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
  const [seed, setSeed] = useState(Math.floor(Math.random() * 9) + 1);
  const [lastChange, setLastChange] = useState(Date.now());
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const [enabledMusic, setEnabledMusic] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession()

  const size = useWindowSize();

  const changeSeed = () => {

    if (Date.now() - lastChange < 400) return
    if (seed < 9) {
      setSeed(seed + 1);
      setLastChange(Date.now())
      console.log(seed);
    } else {
      setSeed(1);
      setLastChange(Date.now())
      console.log(seed);
    }

    if (!enabledMusic) {
      const audio = document.getElementById("audio")
      setEnabledMusic(true)
      // @ts-ignore
      audio.play()
    }

  }

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: ensName } = useEnsName({ address });

  const [difficulty, setDifficulty] = useState(0);
  const [seedMatches, setSeedMatches] = useState(false);
  const [miningEnabled, setMiningEnabled] = useState(false);

  useEffect(() => {
    if (session) {
      setOpen(false)
    }
  }, [session])

  return (
    <div style={{
      height: `${size.height}px`
    }}
      className={`h-full overflow-hidden`}>
      <div className="z-[99999]">
        <ToastContainer />
      </div>
      <Image
        priority
        alt="Background"
        src={`/images/1bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          height: `${size.height}px`
        }}
        className="absolute w-full h-full"
      />
      <Head>
        <title>Free JoJo</title>
        <meta
          name="description"
          content="Meet JoJo!"
        />
      </Head>

      {
        size.width < 1000 ?

          <>
          </>

          :

          <>
          </>

      }
    </div>
  )
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined as any,
    height: undefined as any,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default Page
