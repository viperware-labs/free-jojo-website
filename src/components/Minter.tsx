import { useAccount, useConnect, useEnsName, useNetwork } from 'wagmi'
import keccupABI from '../abi.json';
import { ethers } from "ethers";
import { keccak256, parseEther } from 'ethers/lib/utils';
import { useContractReads } from 'wagmi';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';

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
      <div className="text-white text-center">
        <div className="pt-52 pb-52 md:py-72">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl  font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300 p-2">
            {"Galaxy of Color"}</h1><br/>
          <h2 className="text-lg sm:text-xl lg:text-2xl  font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 p-2">
            The first official drop:<br/><span className="text-3xl font-bold">Color out of Place x Ownrshp</span></h2><br/>

          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 p-2 w-48 mx-auto flex">
            <svg className="m-1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFF" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect><line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
            <div className="m-auto">Jan 18, 2023</div>
          </div>
          
          {/* {chains && (
            <div>Available chains: {chains.map((chain) => chain.name)}</div>
          )} */}
          {/* {isConnected ? (chain && chain.name == "Goerli" ? 
                <>
                  <div className={" font-bold text-md lg:text-lg hidden"}>
                    {ensName ?? address}
                  </div><br/>
                </>
                :
                <>
                  <div className="w-full px-5  font-bold text-xl">Hey fren. You&apos;re on {chain?.name}. You think you could switch your network to the Goerli Testnet for us?</div>
                </>
                ) : (
                  <>
                    <div className={"text-lg  font-bold lg:text-2xl"}>
                      Connect your wallet to start exploring.
                    </div><br/>
                  </>
                )} */}

              <div>
                <div className={"w-3/6 mx-auto sm:w-full text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 mt-10 font-bold text-md lg:text-lg"}>
                  Follow{" "}
                  <a href="https://twitter.com/GalaxyofColor_" rel="noreferrer noopener" target="_blank" className="text-blue-400">@galaxyofcolor_</a>{" "}
                  on Twitter for more details
                </div>
              </div>
        </div>

        {/* 
        
              Galaxy of Color
              This is the first official drop from Color out of Place x Ownrshp. 

              Who is Color out of Place?
              Color out of Place creates art using AI language models combined with AI visual models. Select outputs are then edited and finished by hand.

              Who is Ownrshp?
              Ownrshp helps artists harness the power of web3, build communities, and release art as digital collectibles. 

              The use of AI allows for a level of creativity and experimentation that was previously impossible.

              How does the use of AI help an artist?
              Artists can experiment with different patterns, textures, and color combinations to create unique and complex works of art. This allows for the creation of art that has a high level of detail and precision, giving the art a sense of depth and dimensionality.

        */}

      </div>
    </>
  )
}
