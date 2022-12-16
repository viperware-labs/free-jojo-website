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
import { useState } from 'react';

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
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const changeSeed = () => {
    if (seed < 9) {
      setSeed(seed+1);
      console.log(seed);
    } else {
      setSeed(1);
      console.log(seed);
    }
  }

  // const { connectors, pendingConnector, connectAsync } = useConnect()

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: ensName } = useEnsName({ address });

  const [difficulty, setDifficulty] = useState(0);
  const [seedMatches, setSeedMatches] = useState(false);
  const [miningEnabled, setMiningEnabled] = useState(false);

  return (
    <>
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
      {/* Mobile */}
      <div className="visible sm:invisible sm:h-0">
        <div className="" style={{
          backgroundImage: `url("/images/${seed}bg.png")`,
        }}>
          <div className="p-5 flex">
            <div className="">
            </div>
            <div className="ml-auto">
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

      {/* Desktop */}
      <div className="">
        <div className="" style={{
          backgroundImage: `url("/images/${seed}bg.png")`,
        }}>
          <div className="p-5 flex">
            <div className="">
            </div>
            <div className="ml-auto">
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
  )
}

export default Page
