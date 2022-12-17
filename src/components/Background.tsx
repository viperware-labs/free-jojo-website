import Image from 'next/image';
import React from 'react'

// @ts-ignore
export function Background({ seed, height }) {

    return (
        <>
            <Image
        priority
        alt="Background"
        src={`/images/1bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 1 ? "visible" : "hidden")}`,
          height: `${height}px`,
          zIndex: 0,
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/2bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 2 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/3bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 3 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/4bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 4 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/5bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 5 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/6bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 6 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/7bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 7 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/8bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 8 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
      <Image
        priority
        alt="Background"
        src={`/images/9bg.png`}
        height={800}
        width={1500}
        quality={100}
        style={{
          visibility: `${(seed == 9 ? "visible" : "hidden")}`,
          height: `${height}px`
        }}
        className="absolute w-full h-full"
      />
        </>
    )
}
