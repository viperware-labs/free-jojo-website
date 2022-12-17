import Image from 'next/image';
import React from 'react'

// @ts-ignore
export function WeAreJojo({ seed }) {
    console.log(seed)

    return (
        <>
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/1weare.png`}
                height={1000}
                width={1000}
                quality={100}
                className="h-[4rem] w-auto mt-auto"
                style={{
                    visibility: `${(seed == 1 ? "visible" : "hidden")}`,
                    height: `${(seed == 1 ? "auto" : "0")}`,
                }}
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/2weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 2 ? "visible" : "hidden")}`,
                    height: `${(seed == 2 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/3weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 3 ? "visible" : "hidden")}`,
                    height: `${(seed == 3 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/4weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 4 ? "visible" : "hidden")}`,
                    height: `${(seed == 4 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/5weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 5 ? "visible" : "hidden")}`,
                    height: `${(seed == 5 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/6weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 6 ? "visible" : "hidden")}`,
                    height: `${(seed == 6 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/7weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 7 ? "visible" : "hidden")}`,
                    height: `${(seed == 7 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/8weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 8 ? "visible" : "hidden")}`,
                    height: `${(seed == 8 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
            <Image
                priority
                alt="WeAreJojo"
                src={`/images/9weare.png`}
                height={1000}
                width={1000}
                quality={100}
                style={{
                    visibility: `${(seed == 9 ? "visible" : "hidden")}`,
                    height: `${(seed == 9 ? "auto" : "0")}`,
                }}
                className="h-[4rem] w-auto  mt-auto"
            />
        </>
    )
}
