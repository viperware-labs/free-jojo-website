import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Connect } from './Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import Login from './Login'
import Image from 'next/image'

import { useSession } from "next-auth/react"

//@ts-ignore
export default function Modal({ open, setOpen }) {
  // const [open, setOpen] = useState(true)
  const { data: session } = useSession()

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
                    href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F1033947998314582017%2F1053616442953699410%2Fimage.png&text=Hey%20there%20JoJo!%20@FreeJoJoNFT`}
                    target="_blank"

                  // onClick={null}
                  >
                    <div className="mt-4 h-10 w-full border-black border-[3px] bg-[#205cdd] text-base font-medium text-white shadow-sm px-5 py-0.5 text-primary bg-box mx-1 rounded-lg hover:bg-opacity-95 flex align-middle">
                      <div className="mx-auto my-auto">
                        Tweet #WeAreJojo
                      </div>
                    </div>
                  </a>

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
