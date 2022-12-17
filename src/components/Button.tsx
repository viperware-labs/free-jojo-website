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
                                    <button className="px-5 py-0.5 text-primary bg-box mx-1 rounded hover:bg-opacity-95" onClick={openConnectModal} type="button">
                                        <>
                                            <Image
                                            alt="JoJo List"
                                            height={40}
                                            src={JoJoList}
                                            className="h-16 w-auto sm:h-20"
                                            />
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
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button className="px-5 py-0.5 text-primary bg-box mx-1 rounded hover:bg-opacity-95" onClick={openAccountModal} type="button">
                                        <Image
                                        alt="JoJo List"
                                        height={90}
                                        src={JoJoList}
                                        className="h-16 w-auto sm:h-20"
                                        />
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};