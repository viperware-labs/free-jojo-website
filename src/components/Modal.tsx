import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Connect } from './Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import Login from './Login'
import Image from 'next/image'

import { useSession } from "next-auth/react"

import { useAccount } from 'wagmi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//@ts-ignore
export default function Modal({ open, setOpen }) {
  // const [open, setOpen] = useState(true)
  const { data: session } = useSession()
  const { address, isConnected } = useAccount()
  const [clickedTweet, setClickedTweet] = useState(false)
  const [entry, setEntry] = useState(false)


  const handleClick = async (tweet: string | null | undefined) => {

    if (entry) return;

    // make a fetch request to /enter
    const body = {
      wallet: address,
      twitterUsername: tweet
    }
    const response = await fetch(`/api/enter?wallet=${address}&twitter=${tweet}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(body),


    })

    const data = await response.json()
    console.log(data)
    toast.success("JoJoList Raffle Entered!", {
      position: "top-right"
    })

    setEntry(true)

  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[50px] bg-yellow-200 p-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 border-8 border-black">
                <div className="p-8 rounded-[30px] border-4 border-black">
                  <Image
                    priority
                    alt="Background"
                    src={"/images/JoJoListModal.png"}
                    height={1000}
                    width={1000}
                  />

                  <Connect />

                  <Login />

                  <a
                    href={`https://twitter.com/intent/tweet?text=Hey JoJo! 🐵 @FreeJoJoNFT%0aWen JoJo List? www.freejojo.io`}
                    target="_blank"
                    onClick={() => setClickedTweet(true)} rel="noreferrer"
                  >
                    <div className="mt-4 h-10 w-full border-black border-[3px] bg-[#205cdd] text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95 flex align-middle">
                      <div className="mx-auto my-auto">
                        Tweet &quot;Hey Jojo!&quot;
                      </div>
                    </div>
                  </a>

                  {
                    ((session?.user?.name != null) && isConnected && clickedTweet) &&
                    <button
                      type="button"
                      className="mt-4 h-10 w-full border-black border-[3px] bg-red-600 text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                      onClick={() => handleClick(session?.user?.name)}
                    >
                      Enter Raffle
                    </button>
                  }

                  {/* {entry &&
                    <div className="mt-4 h-10 w-full border-black border-[3px] bg-green-600 text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95">
                      <div className="mx-auto my-auto">
                        <CheckIcon className="h-6 w-6 mx-auto my-auto" aria-hidden="true" />
                      </div>
                    </div>

                  } */}

                  <button
                    type="button"
                    className="mt-4 h-10 w-full border-black border-[3px] bg-indigo-600 text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95"
                    onClick={() => setOpen(false)}
                  >
                    Return to JoJo
                  </button>


                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  )
}
