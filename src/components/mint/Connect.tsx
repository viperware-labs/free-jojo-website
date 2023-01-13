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
                                        <div className="flex flex-col">
                                            <button className="font-bold font-archivobold mt-6 mx-auto text-zinc-900 bg-zinc-200 hover:bg-zinc-300 text-md px-8 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black"
                                                onClick={openConnectModal} type="button">
                                                CONNECT WALLET
                                            </button>
                                        </div>
                                    </>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button className="h-42" onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <>
                                    <div className="flex flex-col">
                                        <button className="font-bold font-archivobold mt-6 mx-auto text-zinc-900 bg-green-500 hover:bg-green-600 text-md px-8 py-4 rounded-2xl border-2 sm:text-lg sm:px-12 sm:py-6 sm:rounded-[28px] sm:border-4 border-black"
                                            onClick={openAccountModal} type="button">
                                            CONNECTED
                                        </button>
                                        <div className="mx-auto font-archivo font-black tracking-widest mt-2">
                                            {account.address && (account.address.slice(0, 6) + "...." + account.address.slice(account.address.length - 4, account.address.length))}
                                        </div>
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