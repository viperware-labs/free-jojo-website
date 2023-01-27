import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"
import loading from '../../public/Loading.gif'

import { createClient, useEnsName, useNetwork } from 'wagmi'
import jojoABI from '../../jojoABI.json';
import { ethers } from "ethers";
import { useContractReads } from 'wagmi';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

import { Connect } from '../../components/mint/Connect'

import MusicPlayer from '../../components/Music'

import Modal from '../../components/Modal';
import { formatEther, keccak256, parseEther } from 'ethers/lib/utils';

import { useSession } from "next-auth/react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Guaranteed from "../../guaranteed.json";
import Allowlist from "../../allowlist.json";
import MerkleTree from 'merkletreejs';

import Web3 from 'web3';
import { createSiweMessage } from "../../util/siwe"
import axios from 'axios'
import { Signer } from 'ethers';

/* Merkle Root */

function Page() {
  // const web3 = new Web3(Web3.givenProvider);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  // const [enabledMusic, setEnabledMusic] = useState(false);
  // const [open, setOpen] = useState(false);

  const { data: session } = useSession()

  const size = useWindowSize();

  const { address, isConnected } = useAccount();

  const API_URL = 'http://localhost:3000'
  // const API_URL = 'https://freejojo.io'


  // IMAGES GRID
  const [images, setImages] = useState<string[]>([]);
  const [imagesPerRow, setImagesPerRow] = useState<number>(0);

  const [myTokens, setMyTokens] = useState([])
  const [selectedTokens, setSelectedTokens] = useState<any[]>([])

  const [minted, setMinted] = useState(0);

  const readSupply = useContractRead({
    address: '0x9278d95B79297e728ecF6F59dc0a6074c2e6Bf5a',
    abi: jojoABI,
    functionName: 'tokensOfOwner',
    args: [address],
    chainId: 1,
    onSuccess(data) {
      console.log(data)
      // @ts-ignore
      let ownedTokens = data.map((bigNum) => formatEther(bigNum as number) * (10 ** 18))
      console.log(ownedTokens)
      setMyTokens(ownedTokens)
    },
    onError(e) {
      console.log(address)
      console.log("READ ERROR", e);
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

  const revealJoJos = async (tokens: number[]) => {
    if (selectedTokens.length > 0) try {
      // @ts-ignore
      const domain = window.location.host;
      // @ts-ignore
      const origin = window.location.origin;
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      console.log(tokens)

      const STATEMENT = tokens;

      const message = createSiweMessage(address, STATEMENT, domain, origin)
      console.log(message)

      const signature = await signer.signMessage(message);

      console.log("Sending... ")
      console.log(`${API_URL}/api/metadata/reveal`)

      axios.post(`${API_URL}/api/metadata/reveal`, {
        data: {
          "address": address,
          "message": message,
          "signature": signature,
        }
      })
        .then(response => {
          toast.success(`Reveal complete!`)
        })
        .catch(e => {
          console.log(e)
          if (e.response.data.error) {
            toast.error(`${e.response.data.error}`)
            console.log(e.response.data.error)
          } else {
            toast.error(`An error occured`)
          }
        });
    } catch (e) {

    }
  }

  const toggleSelect = (_id: number) => {
    let currentSelects = [...selectedTokens];
    const index = currentSelects.indexOf(_id);

    if (index !== -1) {
      currentSelects.splice(index, 1);
    } else {
      currentSelects.push(_id);
    }

    setSelectedTokens(currentSelects)
    console.log(currentSelects)
  }

  return (
    <>
      <div className='font-bold font-archivobold'>
        <ToastContainer
          position="top-left"
          autoClose={5000} />
      </div>
      <div style={{
        minHeight: '100vh',
        height: '100%',
        fontFamily: 'ArchivoBold',
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${size.width < 600 ? `/mint/bg_mobile.png` : `/mint/bg.png`}")`,
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("/mint/bg.png")',
        backgroundRepeat: '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div className='flex'>
          <div className='text-white text-center font-made w-full'>
            <div className='flex w-full pt-[2vh] pr-[1vw]'>
              <div className='ml-auto'>
                <ConnectButton />
              </div>
            </div>
            <div className='mt-[6vh] text-4xl md:text-5xl py-5 w-full mx-auto text-[#30be80]' style={{
              // textShadow: "#999 0px 0px 2px",
              textShadow: "0 0 2px #999, 0 0 2px #999"
            }}>
              Reveal Your JoJos!<br />
            </div>
            {/* <div className='flex w-full h-full flex-col max-h-screen mb-0'> */}
            {
              myTokens.length < 1 ?
                <div className='w-full'>
                  You don&apos;t own any JoJos!
                </div> :
                <div className='mx-[5vw] sm:mx-[14vw] xl:mx-[20vw] mb-[6vh] w-auto h-auto'>
                  <div className={myTokens.length > 3 ? `mx-auto flex items-center space-around flex-wrap` : `mx-auto items-center space-around md:justify-center flex flex-wrap`}>
                    {myTokens.map((i) =>
                      <>
                        <div key={i}
                          onClick={() => {
                            // console.log(fridgesOwned)
                            // revealJoJos([i])
                            toggleSelect(i)
                          }}
                          className='p-5 hover:p-3 hover:cursor-pointer text-white text-2xl text-center font-archivobold w-3/6 md:w-2/6 xl:w-[25%]'>
                          <Image
                            priority
                            alt=""
                            src={`/reveal/jojo.gif`}
                            height={1200}
                            width={1200}
                            quality={100}
                            className={selectedTokens.includes(i) ? 'relative z-10 mb-2 rounded-[14%] border-[4px] border-red-500' : 'relative z-10 mb-2 rounded-[14%] border-[4px] border-zinc-900'}
                          // min-h-[280px] max-h-[280px] min-w-[280px] max-w-[280px]
                          />
                          JoJo #{i}
                        </div>
                      </>)}
                  </div>

                  <div className='flex-col md:flex-row md:px-[14%] py-5 w-full flex'>
                    <button className={`font-bold font-archivobold mt-2 mx-auto text-zinc-900 text-md px-6 py-4 rounded-xl border-2
              md:text-2xl md:px-10 md:py-5 lg:text-3xl lg:px-12 lg:py-6 sm:rounded-[20px] sm:border-4 border-zinc-900 bg-[#d24e6d]
                ${selectedTokens.length > 0 ? 'hover:bg-[#bd3d5b] hover:cursor-pointer ' : 'hover:cursor-default opacity-50'}`}
                      onClick={() => {
                        // console.log(fridgesOwned)
                        revealJoJos(selectedTokens)
                      }}>
                      REVEAL

                    </button>
                    <button className='font-bold font-archivobold mt-2 mx-auto text-zinc-900 text-md px-6 py-4 rounded-xl border-2
              md:text-2xl md:px-10 md:py-5 lg:text-3xl lg:px-12 lg:py-6 sm:rounded-[20px] sm:border-4 border-zinc-900 bg-[#d24e6d] hover:bg-[#bd3d5b] hover:cursor-pointer'
                      onClick={() => {
                        if (selectedTokens.length <= 0) {
                          setSelectedTokens([...myTokens])
                        } else {
                          setSelectedTokens([])
                        }
                      }}>
                      {selectedTokens.length <= 0 ? `SELECT ALL` : `UNSELECT ALL`}

                    </button>
                  </div>
                </div>
            }
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
