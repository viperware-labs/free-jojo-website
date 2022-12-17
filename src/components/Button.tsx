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
                                    <button className="h-10 w-full border-black border-[3px] bg-green-700 text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                                    onClick={openConnectModal} type="button">
                                        <>
                                            <div className="align-middle">
                                                Connect Wallet
                                            </div>
                                        </>
                                    </button>
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
                                <button className="h-10 w-full border-black border-[3px] bg-green-700 text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                                onClick={openAccountModal} type="button">
                                    <>
                                        <div className="align-middle">
                                            Connected: {account.address && (account.address.slice(0, 6) + "...." + account.address.slice(account.address.length - 4, account.address.length))}
                                        </div>
                                    </>
                                </button>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};