// import Link from 'next/link';
import AppContext from '../../appContext';
import { useContext, useEffect, useState } from "react";
import AudioPlayer from '../components/AudioPlayer';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash";


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-yellow-500",
    "from.red-500",
    "from-pink-500",
    "from.purple-500",
]




export default function Player() {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);



    const context = useContext(AppContext);

    const router = useRouter();

    return (

        <div className={`flex space-x-7 bg-gradient-to-b to-black ${color} min-h-screen text-white padding-8 `} >
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white' onClick={() => signOut()} >
                    <img className='rounded-full w-10 h-10' src={session?.user.image} alt="" />
                    <h2>{session?.user.name} </h2>
                    <p className='opacity-30'>Click to sign out</p>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>

            <main className='flex flex-col items-center min-h-screen w-full justify-center'>
                {/* <div>
                    <h1>
                        Here's your synesound
                    </h1>
                </div> */}

                <div className='flex w-full'>

                    {context.imgUrl && <img src={context.imgUrl} />}
                </div>

                <div>
                    <AudioPlayer />
                </div>
                <div>
                    <button className=" flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                        <p>Logout from Spotify</p>
                    </button>

                </div>
                <div>
                    <h3>
                        <button type="button" onClick={() => router.replace('/')}>
                            Back home
                        </button>

                        {/* <Link className='text-white' href="/">Back to home</Link> */}

                    </h3>

                </div>

            </main>


        </div>

    );
}