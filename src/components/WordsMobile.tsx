import Image from 'next/image';
import React from 'react'

// @ts-ignore
export function WordsMobile({ seed }) {
    console.log(seed)

    return (
        <>
            <Image
                priority
                alt="Words"
                src={`/images/1free.png`}
                height={800}
                width={1500}
                quality={100}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
                style={{
                    visibility: `${(seed == 1 ? "visible" : "hidden")}`,
                    height: `${(seed == 1 ? "auto" : "0")}`,
                }}
            />
            <Image
                priority
                alt="Words"
                src={`/images/2free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 2 ? "visible" : "hidden")}`,
                    height: `${(seed == 2 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/3free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 3 ? "visible" : "hidden")}`,
                    height: `${(seed == 3 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/4free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 4 ? "visible" : "hidden")}`,
                    height: `${(seed == 4 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/5free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 5 ? "visible" : "hidden")}`,
                    height: `${(seed == 5 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/6free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 6 ? "visible" : "hidden")}`,
                    height: `${(seed == 6 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/7free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 7 ? "visible" : "hidden")}`,
                    height: `${(seed == 7 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/8free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 8 ? "visible" : "hidden")}`,
                    height: `${(seed == 8 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
            <Image
                priority
                alt="Words"
                src={`/images/9free.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 9 ? "visible" : "hidden")}`,
                    height: `${(seed == 9 ? "auto" : "0")}`,
                }}
                className="h-auto max-h-[15rem] w-auto mx-auto z-10"
            />
        </>
    )
}
