import { ConnectButton } from '@rainbow-me/rainbowkit';

import Image from 'next/image';
import JoJoList from '../../public/images/JoJoList.png'

export const Connect = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <>
                                        <div className="flex">
                                            <button className="font-bold font-archivobold mt-6 mx-auto sm:mr-5 text-zinc-900 bg-zinc-200 hover:bg-zinc-300 text-md px-6 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black"
                                                onClick={openConnectModal} type="button">
                                                CONNECT WALLET
                                            </button>
                                        </div>
                                    </>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <div className="flex">
                                        <button className="font-bold font-archivobold mt-6 mx-auto sm:mr-5 text-zinc-900 bg-red-500 hover:bg-zinc-400 text-md px-6 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black"
                                            onClick={openChainModal} type="button">
                                            WRONG CHAIN
                                        </button>
                                    </div>
                                )
                            }
                            return (
                                <>
                                    <div className="flex flex-col">
                                        <button className="font-bold font-archivobold mt-6 mx-auto sm:mr-5 text-zinc-900 bg-[#30be80] hover:bg-[#26ac72] text-md px-6 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black"
                                            onClick={openAccountModal} type="button">
                                            CONNECTED
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};