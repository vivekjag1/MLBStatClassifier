"use client"; 
import Image from "next/image";
import {useState, useEffect} from "react"
import {motion, AnimatePresence } from "framer-motion"



export default function Home() {
  const [imageIndex, setImageIndex] = useState<number>(0)
  

  const imageArr:string[] = []
  imageArr[0] = "/newFenway.jpg"
  imageArr[1] = "/dodgerStadium.jpg"
  imageArr[2] = "/pncPark.jpg"
  useEffect(() => {
    const interval = setInterval(() =>{
      setImageIndex((prev) => (prev+1)%imageArr.length); 
    }, 2000)
    return () => clearInterval(interval)
  })

 
  const imageString = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out  `

  return (

    <div className=" h-screen w-screen">

      
      {
        imageArr.map((image, index) =>{
          return(
            <>
 
        <motion.div
              key = {index}
              initial = {{opacity:50}}
              animate = {{opacity: index === imageIndex? 1: 0}}
              transition={{duration: 1}}
              className="absolute inset-0"
              >

                <div className="absolute flex items-center justify-center inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-10" />
                <Image src={image} alt={`Hero Image ${index}`} layout="fill" className={imageString} />

              </motion.div>
              </>
          )

        })
      }
    </div>
    
  
    


  );
}
