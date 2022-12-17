import Image from 'next/image';
import React from 'react'

// @ts-ignore
export function Jojo({ seed }) {
    console.log(seed)

    return (
        <>
            <Image
                priority
                alt="Background"
                src={`/images/1jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 1 ? "visible" : "hidden")}`,
                    height: `${(seed == 1 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/2jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 2 ? "visible" : "hidden")}`,
                    height: `${(seed == 2 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/3jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 3 ? "visible" : "hidden")}`,
                    height: `${(seed == 3 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/4jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 4 ? "visible" : "hidden")}`,
                    height: `${(seed == 4 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/5jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 5 ? "visible" : "hidden")}`,
                    height: `${(seed == 5 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/6jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 6 ? "visible" : "hidden")}`,
                    height: `${(seed == 6 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/7jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 7 ? "visible" : "hidden")}`,
                    height: `${(seed == 7 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/8jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 8 ? "visible" : "hidden")}`,
                    height: `${(seed == 8 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
            <Image
                priority
                alt="Background"
                src={`/images/9jojo.png`}
                height={800}
                width={1500}
                quality={100}
                style={{
                    visibility: `${(seed == 9 ? "visible" : "hidden")}`,
                    height: `${(seed == 9 ? "auto" : "0")}`,
                }}
                className="w-[50vw] min-w-[20rem] max-w-[30rem] mx-auto hover:cursor-pointer"
            />
        </>
    )
}
