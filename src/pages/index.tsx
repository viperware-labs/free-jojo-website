import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
import { Minter } from '../components'

import JoJoList from '../../public/images/JoJoList.png'

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


function Page() {
  const [seed, setSeed] = useState(Math.floor(Math.random() * 9) + 1);
  const [lastChange, setLastChange] = useState(Date.now());
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const size = useWindowSize();

  const changeSeed = () => {
    console.log(Date.now() - lastChange)
    if (Date.now() - lastChange < 1000) return
    if (seed < 9) {
      setSeed(seed + 1);
      setLastChange(Date.now())
      console.log(seed);
    } else {
      setSeed(1);
      setLastChange(Date.now())
      console.log(seed);
    }
  }

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: ensName } = useEnsName({ address });

  const [difficulty, setDifficulty] = useState(0);
  const [seedMatches, setSeedMatches] = useState(false);
  const [miningEnabled, setMiningEnabled] = useState(false);

  return (
    <div style={{
      height: `${size.height}px`
    }}
      className={`overflow-clip`}>
      {/* <div>
        {`${size.width} ${size.height}`}
      </div> */}

      {/* <Image
        alt="Background"
        src={`/images/${seed}bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> */}
      {/* {seed == 1 ? <Image
        alt="Background"
        src={`/images/1bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          hidden: `${(seed == 1)}`
        }}
        className="absolute w-full h-full"
      /> : null}
      {seed == 2 ? <Image
        alt="Background"
        src={`/images/2bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 3 ? <Image
        alt="Background"
        src={`/images/3bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 4 ? <Image
        alt="Background"
        src={`/images/4bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 5 ? <Image
        alt="Background"
        src={`/images/5bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 6 ? <Image
        alt="Background"
        src={`/images/6bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 7 ? <Image
        alt="Background"
        src={`/images/7bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 8 ? <Image
        alt="Background"
        src={`/images/8bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null}
      {seed == 9 ? <Image
        alt="Background"
        src={`/images/9bg.png`}
        height={800}
        width={1500}
        quality={100}
        className="absolute w-full h-full"
      /> : null} */}
      <Image
        alt="Background"
        src={`/images/1bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 1 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/2bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 2 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/3bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 3 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/4bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 4 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/5bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 5 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/6bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 6 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/7bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 7 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/8bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 8 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
      <Image
        alt="Background"
        src={`/images/9bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 9 ? "visible" : "hidden")}`
        }}
        className="absolute w-full h-full"
      />
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

      {
        size.width < 1000 ?

          <>
            {/* Mobile */}
            <div style={{
              height: `${size.height}px`
            }}
              className="mobile overflow-clip">
              <div>
                <div className="p-5 flex">
                  <div className="">
                  </div>
                  <div className="ml-auto z-10">
                    <Connect />
                  </div>
                </div>
                <div className={styles.main}
                  style={{

                    fontFamily: 'Wave',
                    fontWeight: '300'

                  }}
                >
                  <div className="text-white text-center w-full flex z-0">
                    <div className="mx-auto center w-full">
                      <Image
                        alt="JoJo Words"
                        src={`/images/${seed}free.png`}
                        width={1000}
                        height={1000}
                        className="h-[30vw] min-h-[24rem] max-h-[30rem] w-auto -translate-y-[25vh] mx-auto z-10"
                      />
                      <div className="-translate-y-[50vh] w-fit mx-auto flex z-0">
                        <Image
                          alt="Click Here"
                          src={ClickHere}
                          width={1000}
                          height={1000}
                          className="h-[20vh] mt-20 translate-y-[16vh] -translate-x-[4rem] absolute w-auto"
                        />
                        <div className="z-[100000] hover:cursor-pointer">
                          <Image
                            alt="JoJo Image"
                            src={`/images/${seed}jojo.png`}
                            width={1000}
                            height={1000}
                            className="w-[50vw] min-w-[42rem] max-w-[50rem] mx-auto hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute h-5/6 w-full flex" onClick={() => changeSeed()}>
                      <div className="w-[50vw] min-w-[35rem] max-w-[40rem] h-[50vw] min-h-[35rem] max-h-[40rem] mx-auto p-1 hover:cursor-pointer hover:p-0 z-[100]"
                      />
                    </div>
                    <div className="absolute h-5/6 w-full flex">
                      <div className="mt-auto ml-auto mr-14 z-50">
                        <MusicPlayer />
                      </div>
                    </div>
                    <div className="absolute h-5/6 w-full flex">
                      <Image
                        alt="We Are Jojo"
                        src={`/images/${seed}weare.png`}
                        width={1000}
                        height={1000}
                        className="h-[4rem] w-auto ml-14 mt-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          :

          <>

            {/* Desktop */}
            <div style={{
              height: `${size.height}px`
            }}
              className="desktop overflow-clip">
              <div className="">
                <div className="p-5 flex">
                  <div className="">
                  </div>
                  <div className="ml-auto z-10">
                    <Connect />
                  </div>
                </div>
                <div className={styles.main}
                  style={{

                    fontFamily: 'Wave',
                    fontWeight: '300'

                  }}
                >
                  <div className="text-white text-center w-full flex z-0">
                    <div className="mx-auto center w-full">
                      <Image
                        alt="JoJo Words"
                        src={`/images/${seed}free.png`}
                        width={1000}
                        height={1000}
                        className="h-[30vw] min-h-[24rem] max-h-[30rem] w-auto -translate-y-[25vh] mx-auto z-10"
                      />
                      <div className="-translate-y-[50vh] w-fit mx-auto flex z-0">
                        <Image
                          alt="Click Here"
                          src={ClickHere}
                          width={1000}
                          height={1000}
                          className="h-[20vh] mt-20 translate-y-[16vh] -translate-x-[4rem] absolute w-auto"
                        />
                        <div className="z-[100000] hover:cursor-pointer">
                          <Image
                            alt="JoJo Image"
                            src={`/images/${seed}jojo.png`}
                            width={1000}
                            height={1000}
                            className="w-[50vw] min-w-[42rem] max-w-[50rem] mx-auto hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute h-5/6 w-full flex" onClick={() => changeSeed()}>
                      <div className="w-[50vw] min-w-[35rem] max-w-[40rem] h-[50vw] min-h-[35rem] max-h-[40rem] mx-auto p-1 hover:cursor-pointer hover:p-0 z-[100]"
                      />
                    </div>
                    <div className="absolute h-5/6 w-full flex">
                      <div className="mt-auto ml-auto mr-14 z-50">
                        <MusicPlayer />
                      </div>
                    </div>
                    <div className="absolute h-5/6 w-full flex">
                      <Image
                        alt="We Are Jojo"
                        src={`/images/${seed}weare.png`}
                        width={1000}
                        height={1000}
                        className="h-[4rem] w-auto ml-14 mt-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
