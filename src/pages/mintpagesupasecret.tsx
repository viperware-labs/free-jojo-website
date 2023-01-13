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

import { Connect } from '../components/mint/Connect'

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

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: ensName } = useEnsName({ address });

  const [difficulty, setDifficulty] = useState(0);
  const [seedMatches, setSeedMatches] = useState(false);
  const [miningEnabled, setMiningEnabled] = useState(false);

  // IMAGES GRID
  const [images, setImages] = useState<string[]>([]);
  const [imagesPerRow, setImagesPerRow] = useState<number>(0);
  console.log("dims", size.width, size.height)

  if (size.width != undefined) {

    let rowsTotal = Math.min(Math.floor(size.width / (size.height / 5)), 9);
    if (imagesPerRow == 0) setImagesPerRow(rowsTotal)
    console.log(rowsTotal)
    console.log(imagesPerRow)
    if (rowsTotal != imagesPerRow) {
      console.log(imagesPerRow)
      setImagesPerRow(rowsTotal);

      let imagesTemp: string[] = []
      for (let i = 1; i <= rowsTotal; i++) {
        imagesTemp.push(`${i}.png`);
      }

      setImages(imagesTemp);

      console.log(images)
    }

  }

  let rows = [1, 2, 3, 4, 5];
  let imageWidth = (size.height / 5) - 30; // width of a single image



  // IMAGES GRID ( MOBILE )
  const [imagesMobile, setImagesMobile] = useState<string[]>([]);
  const [imagesPerColumnMobile, setImagesPerColumnMobile] = useState<number>(0);
  console.log("dims", size.width, size.height)

  if (size.width != undefined) {

    let colsTotal = Math.min(Math.floor(size.height / (size.width / 3)), 9);
    if (imagesPerColumnMobile == 0) setImagesPerColumnMobile(colsTotal)
    console.log(colsTotal)
    console.log(imagesPerColumnMobile)
    if (colsTotal != imagesPerColumnMobile) {
      console.log(imagesPerColumnMobile)
      setImagesPerColumnMobile(colsTotal);

      let imagesTemp: string[] = []
      for (let i = 1; i <= colsTotal; i++) {
        imagesTemp.push(`${i}.png`);
      }

      setImagesMobile(imagesTemp);

      console.log(imagesMobile)
    }

  }

  let colsMobile = [1, 2, 3];
  let imageWidthMobile = (size.width / 3) - 20; // width of a single image

  useEffect(() => {

  }, []);

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
        <Modal open={open} setOpen={setOpen} />
      </div>
      <Image
        priority
        alt="Background"
        src={`/mint/bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          opacity: `100%`,
          height: `${size.height}px`
        }}
        className="absolute w-full h-full -z-10"
      />
      <Head>
        <title>Free JoJo Mint</title>
        <meta
          name="description"
          content="Meet JoJo!"
        />
      </Head>


      {/* BACKGROUND */}
      {
        size.width < 600 ?

          <>
            <div className="absolute w-full flex h-full">
              <div className="justify-around w-full h-full flex">
                {
                  colsMobile.map((col, indexCol) => (
                    <div key={indexCol} className="flex my-6 flex-col">
                      {imagesMobile.map((image, index) => (
                        <Image src={`/mint/${col}/${image}`} alt={`Image ${index + 1}`} width={imageWidthMobile} height={imageWidthMobile} className='-z-1 m-auto opacity-50' />
                      ))}
                    </div>
                  ))
                }
              </div>
            </div>
          </>

          :

          <>
            <div className="absolute w-full flex h-full">
              <div className="justify-around w-full h-full">
                {
                  rows.map((row, indexRow) => (
                    <div key={indexRow} className="flex my-6">
                      {images.map((image, index) => (
                        <Image key={index} src={`/mint/${row}/${image}`} alt={`Image ${index + 1}`} width={imageWidth} height={imageWidth} className='-z-1 m-auto opacity-50' />
                      ))}
                    </div>
                  ))
                }
              </div>
            </div>
          </>

      }

      <div className="w-full h-full text-zinc-200 flex">
        <div className="m-auto z-20 flex flex-col">
          <div className="text-5xl sm:text-6xl font-bold font-archivobold mx-auto">
            MINT NOW!
          </div>
          <div className="text-3xl sm:text-3xl font-bold font-archivobold mx-auto my-5">
            0/7777
          </div>
          <Connect />
        </div>
      </div>
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
