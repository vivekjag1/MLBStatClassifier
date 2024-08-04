"use client"; 
import {motion, useAnimationControls} from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image"
import NavItem from "../components/NavItem"
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SportsBaseball from "@mui/icons-material/SportsBaseball";
import PersonIcon from '@mui/icons-material/Person';
import DatasetIcon from '@mui/icons-material/Dataset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const NavBar = () => {
    const[navBarOpen, setNavBarOpen] = useState<boolean>(true); 
    const [fullyOpen, setFullyOpen] = useState<boolean>(false);
    const containerControls = useAnimationControls(); 
    const changeState = () =>  setNavBarOpen(!navBarOpen)
    const iconAnimation = useAnimationControls()
    const animations = { 
        close: {
            "width":"5rem", 
            transition: {
                type:"spring", 
                damping: 15,
                duration: 0.5, 
            }
        }, 
        open:{
            "width": "18rem", 
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
            setTimeout(() =>{ 
                setFullyOpen(!fullyOpen)
            }, 150)
            
        }
        else{
            containerControls.start("close"); 
            iconAnimation.start("close")
            setTimeout(() =>{ 
                setFullyOpen(!fullyOpen)
            }, 150)

        }
    }, [containerControls, iconAnimation, navBarOpen])

    return (
        <motion.nav variants={animations} animate={containerControls} initial="close" className="bg-red-800 flex flex-col z-10 p-5 fixed top-0 left-0 h-screen shadow-neutral-600 rounded-tr-xl rounded-br-xl cursor-pointer">
            <div className = "flex flex-row w-full justify-between place-items-center">
                
                {navBarOpen && <motion.p variants={textAnimation} className=" whitespace-nowrap flex items-center text-left text-xl text-white font-mono font-bold" onClick={() => setNavBarOpen(true)}>MLB Classifier</motion.p>}
                {navBarOpen && <ArrowBackIosIcon className = "text-white" onClick={() => setNavBarOpen(!navBarOpen)} />}
                {!navBarOpen && <ArrowForwardIosIcon className = "text-white" onClick={() => setNavBarOpen(!navBarOpen)} />}
            </div>
            <NavItem linkTo = "/classifier" title = "Pitch Classifier" open={fullyOpen}>
                    <SportsBaseball sx={{color:"white"}}/>
            </NavItem>
            <NavItem linkTo = "/comparison" title = "Player Comparisons" open={fullyOpen}>
                    <PersonIcon sx={{color:"white"}}/>
            </NavItem>
            <NavItem linkTo = "/data" title = "Player Data" open={fullyOpen}>
                    <DatasetIcon sx={{color:"white"}}/>
            </NavItem>
            <NavItem linkTo = "/teamSchedule" title = "Team Schedules" open={fullyOpen}>
                    <CalendarMonthIcon sx={{color:"white"}}/>
            </NavItem>

        
              
        </motion.nav>

    )
}
export default NavBar; 