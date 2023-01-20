import { createClient, useAccount, useConnect, useEnsName, useNetwork } from 'wagmi'
import { ethers } from "ethers";
import { keccak256, parseEther } from 'ethers/lib/utils';
import { useContractReads } from 'wagmi';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';

import wagmi from 'wagmi'

import Image from 'next/image';

import Free1 from '../../public/images/1free.png'
import Jojo1 from '../../public/images/1jojo.png'
import Weare1 from '../../public/images/1weare.png'

import Free2 from '../../public/images/2free.png'
import Jojo2 from '../../public/images/2jojo.png'
import Weare2 from '../../public/images/2weare.png'

import Free3 from '../../public/images/3free.png'
import Jojo3 from '../../public/images/3jojo.png'
import Weare3 from '../../public/images/3weare.png'

import Free4 from '../../public/images/4free.png'
import Jojo4 from '../../public/images/4jojo.png'
import Weare4 from '../../public/images/4weare.png'

import Free5 from '../../public/images/5free.png'
import Jojo5 from '../../public/images/5jojo.png'
import Weare5 from '../../public/images/5weare.png'

import Free6 from '../../public/images/6free.png'
import Jojo6 from '../../public/images/6jojo.png'
import Weare6 from '../../public/images/6weare.png'

import Free7 from '../../public/images/7free.png'
import Jojo7 from '../../public/images/7jojo.png'
import Weare7 from '../../public/images/7weare.png'

import Free8 from '../../public/images/8free.png'
import Jojo8 from '../../public/images/8jojo.png'
import Weare8 from '../../public/images/8weare.png'

import Play from '../../public/images/Play.png'
import ClickHere from '../../public/images/ClickHere.png'

import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { Connect } from './Button'

import MusicPlayer from './Music'

// @ts-ignore
export function Minter({seed}) {

	// const { connectors, pendingConnector, connectAsync } = useConnect()

	const { address, isConnected } = useAccount();
	const { chain, chains } = useNetwork();
	const { data: ensName } = useEnsName({ address });

	const [difficulty, setDifficulty] = useState(0);
	const [seedMatches, setSeedMatches] = useState(false);
	const [miningEnabled, setMiningEnabled] = useState(false);

	return (
		<>
			<div className="text-white text-center w-full flex z-0">
				<div className="mx-auto center w-full">
					<Image
						alt="JoJo Words"
						src={Free8}
						className="h-[30vw] min-h-[24rem] max-h-[30rem] w-auto -translate-y-[25vh] mx-auto z-10"
					/>
					<div className="-translate-y-[50vh] w-fit mx-auto flex z-0">
						<Image
							alt="Click Here"
							src={ClickHere}
							className="h-[20vh] mt-20 translate-y-[16vh] -translate-x-[4rem] absolute w-auto"
						/>
						<div className="z-[100000] hover:cursor-pointer">
							<Image
								alt="JoJo Image"
								src={Jojo8}
								className="w-[50vw] min-w-[42rem] max-w-[50rem] mx-auto hover:cursor-pointer"
							/>
						</div>
					</div>
				</div>
				<div className="absolute h-5/6 w-full flex">
					<div className="w-[50vw] min-w-[35rem] max-w-[40rem] h-[50vw] min-h-[35rem] max-h-[40rem] mx-auto p-1 hover:cursor-pointer hover:p-0 z-50"
						// onClick={changeSeed}
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
						src={Weare8}
						className="h-[4rem] w-auto ml-14 mt-auto"
					/>
				</div>
			</div>
		</>
	)
}
