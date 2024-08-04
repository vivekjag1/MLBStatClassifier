"use client"; 
import Image from "next/image";
import {useState, useEffect} from "react"
import {motion, AnimatePresence } from "framer-motion"



export default function Home() {
  const [imageIndex, setImageIndex] = useState<number>(0)
  

  const imageArr:string[] = []
  imageArr[0] = "/newFenway.jpg"
  imageArr[1] = "/fenwayBetter.jpg"
  useEffect(() => {
    const interval = setInterval(() =>{
      setImageIndex((prev) => (prev+1)%imageArr.length); 
    }, 2000)
    return () => clearInterval(interval)
  })

  const handleNextImage = () => {
    setImageIndex((prevIndex) => prevIndex+1 == imageArr.length? 0: prevIndex+1); 
  }; 
  const handlePrevious = () =>{
    setImageIndex((prevIndex) => prevIndex-1 < 0? imageArr.length-1: prevIndex-1); 

  }
  const Carousel  = () =>{
    const imageIndex = 0
    const nextIndex = (prevIndex:number) =>{
      return (prevIndex+1 == imageArr.length? 0: prevIndex+1)
    }
    return setTimeout(() =>{
      return(
        <>
              <Image src = {imageArr[nextIndex(imageIndex)]} alt ="fenway hero" layout="fill"/>
        </>
      )
    }, 3000)
   


  


  }

  return (
    <div className = "h-screen w-screen">
                    <Image src = {imageArr[(imageIndex)]} alt ="fenway hero" layout="fill"/>

    </div>

  );
}
