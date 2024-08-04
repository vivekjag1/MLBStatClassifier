"use client"; 
import Image from "next/image";
import {useState, useEffect} from "react"
import {motion, AnimatePresence } from "framer-motion"



export default function Home() {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const imageArr:string[] = ["/newFenway.jpg", "/dodgerStadium.jpg", "/wrigley.jpg", "/bush.jpg"]
  useEffect(() => {
    const interval = setInterval(() =>{
      setImageIndex((prev) => (prev+1)%imageArr.length); 
    }, 2000)
    return () => clearInterval(interval)
  })
  return (
    <div className="relative items-center justify-center h-screen w-screen cursor-pointer">
      {
        imageArr.map((image, index) =>{
          return(
             <motion.div
              key = {index}
              initial = {{opacity:0 }}
              animate = {{opacity: index === imageIndex? 1: 0}}
              transition={{duration: 1}}
              className="absolute inset-0"
              > 
              <div className="absolute flex items-center justify-center inset-0 bg-gradient-to-b from-blue-500 to-blue-900 opacity-40 z-10"/>  
              <Image src={image} alt={`Hero Image ${index}`} fill className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out" />
              </motion.div>
          )
        })
        
      }
      <div className="absolute mb-3 inset-0 flex items-center justify-center z-20">
        <p className="relative  z-20   text-center text-white font-mono text-5xl font-bold ">Understand every pitch, player, and team with machine learning </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <p className="relative mt-20  z-15   text-center text-white font-mono text-3xl font-bold animate-pulse ">Click anywhere to get started </p>
      </div>  
    </div>
  );
}
