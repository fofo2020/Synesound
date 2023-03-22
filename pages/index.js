// import Head from "next/head";
import React, { useState } from 'react';
import { useContext } from "react";
import { Inter } from "next/font/google";
import { FileUpload } from "primereact/fileupload";
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import AppContext from "../appContext";
import ImgExtractor from "./api/regim";
import Typewriter from 'typewriter-effect';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { set } from 'lodash';

const inter = Inter({ subsets: ["latin"] });
export default function Home() {

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // check session login on the console
  const { data: session, status } = useSession();
  console.log(session);

  const context = useContext(AppContext)
  const onUpload = (event) => {
    console.log(event);
    const file = event.files[0].name;
    context.setImgUrl(`https://synesound-image.fra1.cdn.digitaloceanspaces.com/${file}`);

    ImgExtractor(event.files[0]).then((response) => {
      console.log(response);

      localStorage.setItem('colors', JSON.stringify(response.data.colors));
      localStorage.setItem('search', JSON.stringify(response.data.objects[0].name));

      setIsButtonEnabled(true);

    })
    // }


  };

  const router = useRouter()
  return (
    <main className="bg-black">
      <section className='min-h-[85vh] lg:min-h-[78vh] flex items-center' id='home'>
        <div className='container mx-auto '>
          <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'></div>
          <div className='flex-1 text-center font-secondary lg:text-center'>
            <h1 className="text-white text-6xl pb-20 pt-20 ">SyneSound</h1>
            <div className='mb-6 text-[14px] lg:text-[24px]
           font-semibold'>
              <h2>
                <Typewriter className="text-white"
                  onInit={(typewriter) => {
                    typewriter.typeString('Hi! :) I am Synesound. Welcome to your new experience')
                      .callFunction(() => {
                        console.log('String typed out!');
                      })
                      .pauseFor(2500)
                      // .deleteAll()
                      .callFunction(() => {
                        // console.log('All strings were deleted');
                      })
                      .start();
                  }}
                />
              </h2>
            </div>
            <div className='pt-10'>
              <button className="bg-black text-white border p-2 shadow-inner rounded opacity-50 hover:opacity-100" type="button" onClick={() => router.replace('/login')}>
                Start here
              </button>


            </div>
            {/* <Link href="/login">Click here to get Synesounded</Link> */}

            <div className='lg:bottom-8 w-full overflow-hidden z-50'>
              <div className='h-[370px] max-w-[500px] mx-auto px-6 flex justify-between items-center' >
                <FileUpload
                  name="demo"
                  url={"/api/upload"}
                  multiple
                  accept="image/*"
                  maxFileSize={10000000}
                  emptyTemplate={
                    <p className="m-0 flex items-center justify-center text-black">Upload a picture to get it Synesounded</p>
                  }
                  onUpload={onUpload}
                />
                {/* {context.imgUrl && <div><img src={context.imgUrl} /></div>} */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <h3 className="flex-1 text-center font-secondary lg:text-center">
        <button className="bg-black text-white border p-2 shadow-inner rounded opacity-50 hover:opacity-100" type="button" onClick={() => router.replace('/posts/player')} disabled={!isButtonEnabled}>

          Take me there
        </button>

      </h3>
      <div className='h-[55vh]'></div>
    </main>
  );
}



export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }

}
