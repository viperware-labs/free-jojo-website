import { useAccount, useConnect, useEnsName, useNetwork } from 'wagmi'
import keccupABI from '../abi.json';
import { ethers } from "ethers";
import { keccak256, parseEther } from 'ethers/lib/utils';
import { useContractReads } from 'wagmi';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';

import Image from 'next/image';
import GreenWords from '../../public/images/GreenWords.png'
import GreenJoJo from '../../public/images/GreenJojo.png'
import ClickHere from '../../public/images/ClickHere.png'
import WeAreJojo from '../../public/images/WeAreJojo.png'
import Play from '../../public/images/Play.png'

import React from 'react'
import ReactAudioPlayer from 'react-audio-player'


export function Minter() {
	const { address, isConnected } = useAccount();
	const { chain, chains } = useNetwork();
	const { data: ensName } = useEnsName({ address });

	const [seed, setSeed] = useState(0);
	const [difficulty, setDifficulty] = useState(0);
	const [seedMatches, setSeedMatches] = useState(false);
	const [miningEnabled, setMiningEnabled] = useState(false);

	return (
		<>
			<div className="text-white text-center w-full flex z-0">
				<div className="mx-auto center w-full">
					<Image
						alt="JoJo Words"
						src={GreenWords}
						className="h-[30vw] min-h-[24rem] max-h-[30rem] w-auto -translate-y-[25vh] mx-auto z-10"
					/>
					<div className="-translate-y-[50vh] w-fit mx-auto flex">
						<Image
							alt="Click Here"
							src={ClickHere}
							className="h-[20vh] mt-20 translate-y-[16vh] -translate-x-[4rem] absolute w-auto"
						/>
						<Image
							alt="JoJo Image"
							src={GreenJoJo}
							className="w-[50vw] min-w-[42rem] max-w-[50rem] mx-auto p-4 hover:cursor-pointer hover:p-0 z-50"
						/>
					</div>
				</div>
				<div className="absolute h-5/6 w-full flex">
					<Image
						alt="Play"
						src={Play}
						className="h-28 w-auto p-4 hover:cursor-pointer hover:p-0 mt-auto ml-auto mr-14"
					/>
				</div>
				<div className="absolute h-5/6 w-full flex">
					<Image
						alt="We Are Jojo"
						src={WeAreJojo}
						className="h-[4rem] w-auto ml-14 mt-auto"
					/>
				</div>
			</div>
		</>
	)
}
