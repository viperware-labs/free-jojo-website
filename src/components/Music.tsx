import { useEffect, useState, useRef } from 'react';
import Image from "next/image";

import Play from '../../public/images/Play.png'
import Pause from '../../public/images/Pause.png'

export default function MusicPlayer() {
    // ...
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = document.getElementById("audio");

        //@ts-ignore
        audio.volume = 0.05

        // @ts-ignore
        isPlaying ? audio.play() : audio.pause();

    }, [isPlaying]);

    return (
        <div className="">
            <div className="">
                <div className="duration-100 ">
                    {isPlaying ? (
                        <Image
                            alt="Pause"
                            height={90}
                            src={Pause}
                            onClick={() => {
                                setIsPlaying(false)
                            }}
                            className="p-1 hover:cursor-pointer hover:p-0 h-[60px] w-auto sm:h-[90px]"
                        />
                    ) : (
                        <Image
                            alt="Play"
                            height={90}
                            src={Play}
                            onClick={() => {
                                setIsPlaying(true)
                            }}
                            className="p-1 hover:cursor-pointer hover:p-0 h-[60px] w-auto sm:h-[90px]"
                        />
                    )}
                    <audio id="audio" preload="auto" autoPlay loop onPlay={() => {
                            setIsPlaying(true)
                    }} >
                        <source src="https://cdn.discordapp.com/attachments/268502324492763136/1064122034285711460/JojoMusic.mp3" type="audio/mp3" />
                    </audio>
                </div>
            </div>



        </div>
    );

}
