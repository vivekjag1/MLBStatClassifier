"use client"; 
import ComparisonModal from "@/components/ComparisonModal";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ComparisonProvider, useComparisonContext } from "@/contexts/comparisonContext";
import axios from "axios"
import { Pitch } from "@/components/customColumnsPitches";
const Page = () =>{
    const [open, setOpen] = useState<boolean>(false); 
    const {pitcherOne, pitcherTwo} = useComparisonContext(); 
    const [pitcherOneData, setPitcherOneData] = useState<JSON>(); 
    const [pitcherTwoData, setPitcherTwoData] = useState<JSON>(); 
    const [PlayerOnePitches, setPlayerOnePitches] = useState<Pitch[]>([]); 
    const [PlayerTwoPitches, setPlayerTwoPitches] = useState<Pitch[]>([]); 


    const [fetched, setFetched] = useState<boolean>(false); 
    useEffect(() => { 
        const getData = async () => { 

            if(pitcherOne.length > 0){
                
                const playerOne = await axios.post(`/api/getPitcherByName/${pitcherOne}`); 
                setPitcherOneData(playerOne.data); 
                const pitchesPlayerOne = await axios.post(`/api/getPitchesByPitcher/${pitcherOne}`)
                setPlayerOnePitches(pitchesPlayerOne.data); 
                
                console.log("eee", PlayerOnePitches); 
            }
            if(pitcherTwo.length > 0){
                const playerTwo = await axios.post(`/api/getPitcherByName/${pitcherTwo}`); 
                setPitcherTwoData(playerTwo.data); 
                const pitchesPlayerTwo = await axios.post(`/api/getPitchesByPitcher/${pitcherTwo}`)
                setPlayerTwoPitches(pitchesPlayerTwo.data); 
                console.log("eee", PlayerTwoPitches); 

            }
            return 
        }
        if(!fetched){ 
            getData().then(); 
        }
        else{
            return; 
        }

    }, [pitcherOne, pitcherTwo])


    return (
        <>
       <ComparisonModal open= {open} handleClose={() => setOpen(false)}/>
        <div className = "bg-gray-200 h-screen overflow-hidden">
            <div className = "text-center text-bold font-mono ml-20 text-3xl text-black">
                Compare Player Statistics
            </div>
            <div className = "text-center text-bold font-mono ml-20 text-smtext-black">
                Compare pitchers based on velocity, movement, and more. 
            </div>

        <div className="items-center bg-gray-200 mt-5 ml-20 justify-center text-black  text-center ">
             <Button type="button" onClick={() => setOpen(true)}>New Comparison</Button>
        </div>
        <div className = "grid grid-cols-2 ml-20 overflow-y-hidden h-screen bg-gray-200">

            <div className = "flex flex-col items-center justify-center overflow-hidden">
                <div className="ml-10 mt-10 mb-10 items-center justify-center h-full w-2/3 bg-white rounded-xl overflow-hidden">
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Player 1 - {pitcherOne.length? pitcherOne: 'No comparison'}  </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Velocity (MPH) - The speed of the pitch as it crosses home plate </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Z-Break (inches) - The pitch break in the Z-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Rise (inches) - The vertical pitch movement relative to its expected trajectory </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">X-Break (inches) - The pitch break in the x-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 mb-5 font-light  mt-5  text-sm font-mono">Tail (inches) - The pitch movement realative to its expected trajectory </h1>
                </div>
            </div>
            <div className = "flex flex-col items-center justify-center overflow-hidden">
                <div className="ml-10 mt-10 mb-10 items-center justify-center h-full w-2/3 bg-white rounded-xl overflow-hidden">
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Player 2 - {pitcherTwo.length> 0? pitcherTwo: 'No comparison'}  </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Velocity (MPH) -  {PlayerOnePitches.length} </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Z-Break (inches) - The pitch break in the Z-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Rise (inches) - The vertical pitch movement relative to its expected trajectory </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">X-Break (inches) - The pitch break in the x-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 mb-5 font-light  mt-5  text-sm font-mono">Tail (inches) - The pitch movement realative to its expected trajectory </h1>
                </div>
            </div>
        </div>



        
        </div>
        </>
    )
}
export default Page