import React, { useState } from 'react';

export function FAQ() {
  const [expanded, setExpanded] = useState(0);

  const handleClick = (number: any) => {
    if (expanded == number) {
      setExpanded(0);
      return;
    }
    setExpanded(number);
  }

  return (
    <div className="text-white w-5/6 md:w-4/6 lg:w-3/6 max-w-3xl flex flex-col text-left h-[800px]">

      <div className="mb-1 p-2 w-full">
        <hr />
        <div className="w-full flex" onClick={() => handleClick(1)}>
          <div className="w-5/6">
            <div className="mt-4 text-xl  font-bold pr-3">
              Galaxy of Color
            </div>
          </div>
          <div className="">
            <button className="ml-auto mr-0 h-20 w-20"><svg className="border rounded-full" width="3em" height="3em" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></button>
          </div>
        </div>
        <div>
          {expanded == 1 && (
            <p className="mt-3 font-bold pr-32">
              This is the beginning of the Galaxy of Color.
              Once launched, Discord will be available for the community to engage with the artist, Ownrshp, and one another.
              Our goal is to provide access to creators, founders, and artists to support the growth and education of our community.
              We are excited to explore this Galaxy together, let&apos;s see what&apos;s out there.
            </p>
          )}
        </div>
      </div>

      <div className="mb-1 p-2 w-full">
        <hr />
        <div className="w-full flex" onClick={() => handleClick(2)}>
          <div className="w-5/6">
            <div className="mt-4 text-xl  font-bold pr-3">
              Who is Color out of Place?
            </div>
          </div>
          <div className="">
            <button className="ml-auto mr-0 h-20 w-20"><svg className="border rounded-full" width="3em" height="3em" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></button>
          </div>
        </div>
        <div>
          {expanded == 2 && (
            <p className="mt-3  font-bold pr-32">
              Color out of Place creates art using AI language models combined with AI visual models.
              These compositions are carefully curated and finished by hand to give them a human touch and bring out their emotional depth.
              You can find @coloroutofplace on{" "}
              <a href="https://twitter.com/coloroutofplace" rel="noreferrer noopener" target="_blank" className="text-blue-400">Twitter</a>{" "}
              and{" "}
              <a href="https://instagram.com/coloroutofplace" rel="noreferrer noopener" target="_blank" className="text-blue-400">Instagram.</a>{" "}
            </p>
          )}
        </div>
      </div>

      <div className="mb-1 p-2 w-full">
        <hr />
        <div className="w-full flex" onClick={() => handleClick(3)}>
          <div className="w-5/6">
            <div className="mt-4 text-xl  font-bold pr-3">
              Who is Ownrshp?
            </div>
          </div>
          <div className="">
            <button className="ml-auto mr-0 h-20 w-20"><svg className="border rounded-full" width="3em" height="3em" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></button>
          </div>
        </div>
        <div>
          {expanded == 3 && (
            <p className="mt-3  font-bold pr-32">
              Ownrshp helps artists harness the power of web3, build communities, and release art as digital collectibles. 
            </p>
          )}
        </div>
      </div>

      <div className="mb-1 p-2 w-full">
        <hr />
        <div className="w-full flex" onClick={() => handleClick(4)}>
          <div className="w-5/6">
            <div className="mt-4 text-xl  font-bold pr-3">
              How does the use of AI help an artist?
            </div>
          </div>
          <div className="">
            <button className="ml-auto mr-0 h-20 w-20"><svg className="border rounded-full" width="3em" height="3em" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg></button>
          </div>
        </div>
        <div>
          {expanded == 4 && (
            <p className="mt-3  font-bold pr-32">
              Artists can experiment with different patterns, textures, and color combinations to create unique and complex works of art. This allows for the creation of art that has a high level of detail and precision, giving the art a sense of depth and dimensionality.
            </p>
          )}
        </div>
      </div>

      <div className="mb-3 p-2 w-full">
        <hr />
      </div>

      {/* 
      
            Galaxy of Color
            This is the first official drop from Color out of Place x Ownrshp. 

            Who is Color out of Place?
            Color out of Place creates art using AI language models combined with AI visual models. Select outputs are then edited and finished by hand.

            Who is Ownrshp?
            Ownrshp helps artists harness the power of web3, build communities, and release art as digital collectibles. 

            The use of AI allows for a level of creativity and experimentation that was previously impossible.

            How does the use of AI help an artist?
            Artists can experiment with different patterns, textures, and color combinations to create unique and complex works of art. This allows for the creation of art that has a high level of detail and precision, giving the art a sense of depth and dimensionality.

      */}

    </div>
  );
}
