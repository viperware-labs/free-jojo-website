import { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import Play from '../../public/images/Play.png'

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
                <div className="relative duration-100 ">
                    {isPlaying ? (
                            <Image
                            alt="JoJo List"
                            height={90}
                            src={Play}
                            onClick={() => setIsPlaying(false)}
                            className="p-1 hover:cursor-pointer hover:p-0 "
                            />
                    ) : (
                        <Image
                        alt="JoJo List"
                        height={90}
                        src={Play}
                        onClick={() => setIsPlaying(true)}
                        className="p-0 hover:cursor-pointer hover:p-1"
                        />
                    )}
                    <audio id="audio" preload="auto" autoPlay loop >
                        <source src="/JojoMusic.mp3" type="audio/mp3" />
                    </audio>
                </div>
            </div>



        </div>
    );

}
