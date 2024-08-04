"use client"; 
import {motion, useAnimationControls} from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const NavBar = () => {
    const[navBarOpen, setNavBarOpen] = useState<boolean>(true); 
    const containerControls = useAnimationControls(); 
    const changeState = () =>  setNavBarOpen(!navBarOpen)
    const iconAnimation = useAnimationControls()
    const animations = { 
        close: {
            "width":"7rem", 
            transition: {
                type:"spring", 
                damping: 15,
                duration: 0.5, 
            }
        }, 
        open:{
            "width": "17rem", 
            transition: {
                type:"spring", 
                damping: 15, 
                duration: 0.5
            }
        }
    }
    const animateIcon = {
        close:{
            rotate:360
        }, 
        open:{
            rotate:180
        }
    };
    const textAnimation = {
        close: {opacity: 0},
        open: {opacity: 1, duration: 0.5
        }
    }

    useEffect(() => {
        if(navBarOpen){
            containerControls.start("open"); 
            iconAnimation.start("open")
        }
        else{
            containerControls.start("close"); 
            iconAnimation.start("close")
        }
    }, [containerControls, iconAnimation, navBarOpen])

    return (
        <motion.nav variants={animations} animate={containerControls} initial="close" className="bg-blue-800 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-screen shadow-neutral-600 rounded-tr-xl rounded-br-xl cursor-pointer">
            <div className = "flex flex-row w-full justify-between place-items-center">
                <div className = "flex items-center">
                    <Image src = "/baseballPlayer.png" alt = "clipart"  className="absolute object-contain" width={40} height={40} />
                </div>
                {navBarOpen && <motion.p variants={textAnimation} className="ml-5 whitespace-nowrap flex items-center text-xl text-white font-mono font-bold" onClick={() => setNavBarOpen(true)}>MLB Classifier</motion.p>}
                {navBarOpen && <ArrowBackIosIcon className = "text-white" onClick={() => setNavBarOpen(!navBarOpen)} />}
                {!navBarOpen && <ArrowForwardIosIcon className = "text-white" onClick={() => setNavBarOpen(!navBarOpen)} />}
                


            </div>
        </motion.nav>

    )
}
export default NavBar; 