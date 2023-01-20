import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"
import JoJoList from '../../public/images/JoJoList.png'
import loading from '../../public/Loading.gif'

import styles from '../../styles/Home.module.css';
import { Minter } from '../components'
import { mainnet, goerli, sepolia } from 'wagmi/chains'
import { createClient, useEnsName, useNetwork } from 'wagmi'
import jojoABI from '../jojoABI.json';
import { ethers } from "ethers";
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
import { formatEther, keccak256, parseEther } from 'ethers/lib/utils';

import { useSession } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Guaranteed from "../guaranteed.json"
import MerkleTree from 'merkletreejs';

import Web3 from 'web3';
import { isNumberObject } from 'util/types';

/* Merkle Root */

// const addresses = ["0xd6e67ce446dC04dcF3F3556B8150F370D4c52A62", "0x9d3F56186CE4bA86214AE9127e07491f2449D698"]

function Page() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const [enabledMusic, setEnabledMusic] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession()

  const size = useWindowSize();

  const { address, isConnected } = useAccount();

  // IMAGES GRID
  const [images, setImages] = useState<string[]>([]);
  const [imagesPerRow, setImagesPerRow] = useState<number>(0);

  const [minted, setMinted] = useState(0);

  const readSupply = useContractRead({
    address: '0x9278d95b79297e728ecf6f59dc0a6074c2e6bf5a',
    abi: jojoABI,
    functionName: 'totalSupply',
    chainId: 1,
    onSuccess(data) {
      // @ts-ignore
      console.log('Supply', formatEther(data as number) * (10 ** 18))
      // @ts-ignore
      setMinted(formatEther(data as number) * (10 ** 18));
    },
    onError(e) {
      console.log("Supply Error", e);
    }
  })


  if (size.width != undefined) {

    let rowsTotal = Math.min(Math.floor(size.width / (size.height / 5)), 9);
    if (imagesPerRow == 0) setImagesPerRow(rowsTotal)
    if (rowsTotal != imagesPerRow) {
      setImagesPerRow(rowsTotal);

      let imagesTemp: string[] = []
      for (let i = 1; i <= rowsTotal; i++) {
        imagesTemp.push(`${i}.png`);
      }

      setImages(imagesTemp);
    }

  }

  let rows = [1, 2, 3, 4, 5];
  let imageWidth = (size.height / 5) - 30; // width of a single image

  // CONTRACT

  const [amount, setAmount] = useState(0);
  const [canMint, setCanMint] = useState(false);
  const [merkleProof, setMerkleProof] = useState<any[]>([]);

  // Merkle Root

  const [mintError, setMintError] = useState("");

  const [depositList, setDepositList] = useState<string[]>([]);

  // const leaves = addresses.map(x => keccak256(x))

  const handleProof = async (address: string | undefined, amount: number) => {
    const addresses = Object.keys(Guaranteed);

    const leaves = addresses.map(_addr => {
      //@ts-ignore
      let leaf = ethers.utils.solidityKeccak256(['address', 'uint256'], [_addr, Guaranteed[_addr]]);
      // console.log(_addr, leaf);
      return leaf;
    });

    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const buf2hex = (x: Buffer) => '0x' + x.toString('hex')

    let leaf = "";
    let proof = [""];

    console.log("root", buf2hex(tree.getRoot()))

    if (address !== undefined && Guaranteed.hasOwnProperty(address)) {
      //@ts-ignore
      let leaf = ethers.utils.solidityKeccak256(['address', 'uint256'], [address, Guaranteed[address]]);
      // leaf = keccak256(hash) // address from wallet using walletconnect/metamask
      proof = tree.getProof(leaf).map(x => buf2hex(x.data))
      console.log("proof", proof)
      setMerkleProof(proof);
      // proof = proof.map(x => ethers.utils.formatBytes32String(x));
      // setMerkleProof(proof.map(x => x.slice(2)));
    }
  }

  useEffect(() => {
    //@ts-ignore
    if (Guaranteed[address as string]) {
      //@ts-ignore
      let value = Guaranteed[address as string];
      setAmount(value)
      setCanMint(true);
    } else {
      setAmount(0);
      setCanMint(false);
    }
  }, [address]);

  const claimJoJosConfig = usePrepareContractWrite({
    address: '0x9278d95B79297e728ecF6F59dc0a6074c2e6Bf5a',
    abi: jojoABI,
    functionName: 'claimJoJos',
    overrides: {
      value: ethers.utils.parseEther('0'),
    },
    args: [amount, merkleProof],
    chainId: 1,
  })

  const claimJoJos = useContractWrite({
    ...claimJoJosConfig.config,
  })

  // IMAGES GRID ( MOBILE )
  const [imagesMobile, setImagesMobile] = useState<string[]>([]);
  const [imagesPerColumnMobile, setImagesPerColumnMobile] = useState<number>(0);

  if (size.width != undefined) {

    let colsTotal = Math.min(Math.floor(size.height / (size.width / 3)), 9);
    if (imagesPerColumnMobile == 0) setImagesPerColumnMobile(colsTotal)
    if (colsTotal != imagesPerColumnMobile) {
      setImagesPerColumnMobile(colsTotal);

      let imagesTemp: string[] = []
      for (let i = 1; i <= colsTotal; i++) {
        imagesTemp.push(`${i}.png`);
      }

      setImagesMobile(imagesTemp);
    }

  }



  let colsMobile = [1, 2, 3];
  let imageWidthMobile = (size.width / 3) - 20; // width of a single image

  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);

  const handleMint = () => {
    console.log(address, amount, merkleProof)

    try {
      if (amount > 0) {
        // @ts-ignore
        claimJoJos?.write();
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (isConnected) handleProof(address, amount);
  }, [address]);

  useEffect(() => {
    // if (!enabledMusic) {
    //   const audio = document.getElementById("audio")
    //   setEnabledMusic(true)
    //   // @ts-ignore
    //   audio.play()
    // }

  }, [address]);

  useEffect(() => {
    // Loading Screen

    // setTimeout(() => {
    //   setLoaded(true);
    // }, 5000)
  }, []);

  useEffect(() => {
    if (session) {
      setOpen(false)
    }
  }, [session])

  return (
    <>
      <Image
        priority
        alt="Background"
        src={size.width < 600 ? `/mint/bg_mobile.png` : `/mint/bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          opacity: `100%`,
          height: `${size.height}px`
        }}
        className="absolute w-full h-full -z-10"
      />

      <div
        style={entered ? { display: 'none' } : { display: '' }}
        className="absolute flex w-full h-full"
      >
        <button
          className='text-black border-2 border-black bg-[#30be80] hover:bg-[#26ac72] text-center py-5 px-8 rounded-lg m-auto hover:pointer z-50 font-archivobold text-4xl flex '
          onClick={() => {
            setEntered(true);
            setTimeout(() => {
              setLoaded(true);
            }, 5000);

            if (!enabledMusic) {
              const audio = document.getElementById("audio")
              setEnabledMusic(true)
              // @ts-ignore
              audio.play()
            }
          }}>

          <div className="">
            ENTER
          </div>
          
          {/* <div className="w-7" />

          <div className="-translate-y-0.5">
            &#8594;
          </div> */}

        </button>

      </div>

      <div
        style={(!loaded && entered) ? { display: '' } : { display: 'none' }}
        className="absolute flex w-full"
      >
        {size.width < 600 ? (
          // <div
          //   className="mx-auto overflow-visible">
          //   <Image
          //     alt="bruh"
          //     src={loading}
          //     // height={844}
          //     // width={size.height * 1440}
          //     className={`mx-auto w-[200vw] h-screen`}
          //   />

          // </div>
          <div className="relative h-screen w-screen overflow-hidden flex">
            {/* <Image src={loading} alt="centered gif" className="object-center my-auto object-cover" style={{ maxWidth: '100vw', maxHeight: '50vh' }} /> */}

            <div
              className="object-center my-auto object-cover">
              <video id="loader"
                autoPlay
                muted
                className="w-screen"
              >
                <source
                  src="/Loading.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        ) : (
          <div
            className="h-screen w-auto mx-auto">
            <video id="loader"
              autoPlay
              muted
              className="h-screen w-auto"
            >
              <source
                src="/Loading.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <div
        style={loaded ? {
          display: '',
        } : {
          position: 'absolute',
          opacity: '0',
          height: '0',
        }}
      >

        <div style={{
          height: `${size.height}px`
        }}
          className={`h-full overflow-hidden`}>
          <div className="z-[99999]">
            <ToastContainer />
            <Modal open={open} setOpen={setOpen} />
          </div>
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
                            <Image key={index} src={`/mint/${col}/${image}`} alt={`Image ${index + 1}`} width={imageWidthMobile} height={imageWidthMobile} className='-z-1 m-auto opacity-50' />
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

          <div className="ml-[3vw] flex">

            <div className="flex z-50 h-20 my-auto">
              <a href='https://opensea.io/collection/freejojo-official'
                target='_blank' rel='noopenner noreferrer'
                className='my-auto hover:cursor-pointer'>
                <Image
                  priority
                  alt="Opensea"
                  height={65}
                  width={65}
                  src={`/mint/Opensea.png`}
                  quality={100}
                  className='h-3/6 hover:opacity-80'
                />
              </a>

              <div className='w-6' />

              <a href='https://twitter.com/FreeJoJoNFT'
                target='_blank' rel='noopenner noreferrer'
                className='my-auto hover:cursor-pointer'>
                <Image
                  priority
                  alt="Twitter"
                  height={65}
                  width={65}
                  src={`/mint/Twitter.png`}
                  quality={100}
                  className='h-3/6 hover:opacity-80'
                />
              </a>

              <div className='w-6' />

              <a href='https://etherscan.io/address/0x9278d95b79297e728ecf6f59dc0a6074c2e6bf5a#writeContract'
                target='_blank' rel='noopenner noreferrer'
                className='my-auto hover:cursor-pointer'>
                <Image
                  priority
                  alt="Etherscan"
                  height={65}
                  width={65}
                  src={`/mint/Etherscan.png`}
                  quality={100}
                  className='h-3/6 hover:opacity-80'
                />
              </a>

            </div>

            <div className="w-full z-50 flex">
              <div className='my-auto ml-auto mr-3 sm:mr-5 sm:mt-5'>
                <Connect />
              </div>
            </div>

          </div>

          <div className="w-full h-full text-zinc-200 flex flex-col">
            <div className="mx-auto z-20 flex flex-col items-center">
              <Image
                priority
                alt="Free JoJo"
                height={300}
                width={size.width < 600 ? 300 : 400}
                // width={300}
                src={`/mint/jojologo.png`}
                quality={100}
                className="mt-20 z-10"
              />
              <div className="mt-10 text-5xl sm:text-6xl font-bold font-archivobold">
                MINT NOW!
              </div>
              <div className="mx-auto font-archivo font-black tracking-widest mb-2">
                {address ? address && (address.slice(0, 6) + "...." + address.slice(address.length - 4, address.length)) : ''}
              </div>
              <div className="text-3xl sm:text-3xl font-bold font-archivobold my-5">
                {minted} / 7777
              </div>

              {isConnected ?
                <>
                  <div className="flex flex-col font-bold font-archivobold ">
                    {
                      amount > 0 ?
                        <>
                          <div className='mx-auto'>
                            You are eligible to free {amount + " " + (amount > 1 ? "JoJos" : "JoJo")}
                          </div>
                        </>
                        :
                        <>
                          <div className='mx-auto'>
                            You are not eligible to free any JoJos during this phase!
                          </div>
                        </>
                    }

                    {
                      amount <= 0 ?
                        <>
                        </>

                        :

                        <button className={`font-bold font-archivobold mt-2 mx-auto text-zinc-900 bg-[#d24e6d] hover:bg-[#bd3d5b] text-md px-6 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black`}
                          onClick={handleMint} type="button">
                          CLAIM JOJOS
                        </button>
                    }
                  </div>
                </>
                :
                <>
                </>
              }

            </div>

            <div className="flex">
              <div className="ml-auto z-50 mr-5 mb-5">
                <MusicPlayer />
              </div>
            </div>
          </div>


        </div>

      </div>

    </>
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
