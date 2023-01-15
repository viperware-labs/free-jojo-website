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
      <Background seed={seed} height={size.height} />
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
            {/* Mobile */}
            <div
              className="">

              <Modal open={open} setOpen={setOpen} />
              <div className={styles.main}
                style={{

                  fontFamily: 'Wave',
                  fontWeight: '300',

                }}
              >
                <div className="text-white text-center w-full flex z-0">
                  <div className="mx-auto mt-0 center w-full">
                    <div className="w-full flex">
                      <div className="ml-auto p-5">
                        <MusicPlayer />
                      </div>
                    </div>
                    <div className="h-28">
                      {/* <Image
                        priority
                        alt="JoJo Words"
                        src={`/images/${seed}free.png`}
                        width={1000}
                        height={1000}
                        className="h-auto max-h-[15rem] w-auto mx-auto z-10"
                      /> */}
                      <WordsMobile seed={seed} />
                    </div>
                    <div className="w-fit mx-auto flex z-0">
                      <Image
                        priority
                        alt="Click Here"
                        src={ClickHere}
                        width={1000}
                        height={1000}
                        className="h-[10vh] mt-0 -translate-x-[1rem] translate-y-[12vh] absolute w-auto"
                      />
                      <div className="z-[100]">
                        {/* <Image
                          priority
                          alt="JoJo Image"
                          src={`/images/${seed}jojo.png`}
                          width={1000}
                          height={1000}
                          onClick={() => changeSeed()}
                          className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
                        /> */}
                        <div onClick={() => { changeSeed() }}>
                          <JojoMobile seed={seed} />
                        </div>

                        {/* <div className="flex">
                          <div className="mt-auto ml-auto z-50">
                            <MusicPlayer />
                          </div>
                        </div> */}
                        <Image
                          priority
                          alt="We Are Jojo"
                          src={`/images/${seed}weare.png`}
                          width={1000}
                          height={1000}
                          className="h-[4rem] w-auto mx-auto mt-5"
                        />

                        <div className="flex mt-10">
                          <div className="mx-auto my-auto">
                            <button className="px-5 py-0.5 text-primary bg-box mx-1 rounded hover:bg-opacity-95" onClick={() => setOpen(true)} type="button">
                              <>
                                <Image
                                  alt="JoJo List"
                                  height={90}
                                  src={JoJoList}
                                  className="h-16 w-auto sm:h-20"
                                />
                              </>
                            </button>
                          </div>
                          {/* <div className="my-auto z-50">
                            <Connect />
                          </div> */}
                        </div>

                      </div>
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
              className="mobile overflow-clip">
              <Modal open={open} setOpen={setOpen} />
              <div className="z-[1] absolute w-full">
                <div className="mx-auto">
                  <Words seed={seed} />
                </div>
              </div>
              <div className="flex">
                <div className="ml-auto z-[10]">
                  <button className="px-5 py-3 text-primary bg-box mx-1 rounded hover:bg-opacity-95 z-[100]" onClick={() => setOpen(true)} type="button">
                    <>
                      <Image
                        alt="JoJo List"
                        height={90}
                        src={JoJoList}
                        className="h-16 w-auto sm:h-20"
                      />
                    </>
                  </button>
                </div>
              </div>
              <div className={styles.main}>
                <div className="text-white text-center w-full flex z-[100]">
                  <div className="mx-auto center w-full">
                    {/* <div className="-translate-y-[50vh] w-fit mx-auto flex z-0">

                        // Click HERE

                      <div className="z-[100000] hover:cursor-pointer" onClick={() => { changeSeed() }}>
                        <Jojo seed={seed} />
                      </div>
                    </div> */}
                  </div>
                  <div className="absolute h-1/6 w-full flex z-[100]">
                    <div className="mt-auto mx-auto z-[100]">
                      <Image
                        priority
                        alt="Click Here"
                        src={ClickHere}
                        width={1000}
                        height={1000}
                        className="h-[20vh] mt-20 translate-y-[16vh] -translate-x-[4rem] absolute w-auto"
                      />
                      <Jojo seed={seed} />
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
                  <div className="pl-14 absolute h-5/6 w-full flex">
                    <WeAreJojo seed={seed} />
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
