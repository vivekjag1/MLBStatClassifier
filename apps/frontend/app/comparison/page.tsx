"use client"; 
import ComparisonModal from "@/components/ComparisonModal";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ComparisonProvider, useComparisonContext } from "@/contexts/comparisonContext";
import axios from "axios"
import { Pitch } from "@/components/customColumnsPitches";

type PitchType = { 
    "pitchID": number,
    "pitcherName": string,
    "rise": number,
    "tail": number,
    "type": string,
    "velocity": number,
    "x-break": number,
    "z-break":number

}
const Page = () =>{
    const [open, setOpen] = useState<boolean>(false);
    const {pitcherOne, pitcherTwo} = useComparisonContext();
    const [pitcherOneData, setPitcherOneData] = useState<JSON>();
    const [pitcherTwoData, setPitcherTwoData] = useState<JSON>();
    const [PlayerOnePitches, setPlayerOnePitches] = useState<PitchType[]>([]);
    const [PlayerTwoPitches, setPlayerTwoPitches] = useState<PitchType[]>([]);




    const [fetched, setFetched] = useState<boolean>(false);
    useEffect(() => {
        const getData = async () => {


            if(pitcherOne.length > 0){
               
                const playerOne = await axios.post(`/api/getPitcherByName/${pitcherOne}`);
                setPitcherOneData(playerOne.data);
                const pitchesPlayerOne = await axios.post(`/api/getPitchesByPitcher/${pitcherOne}`)
                setPlayerOnePitches(pitchesPlayerOne.data);
               
            }
            if(pitcherTwo.length > 0){
                const playerTwo = await axios.post(`/api/getPitcherByName/${pitcherTwo}`);
                setPitcherTwoData(playerTwo.data);
                const pitchesPlayerTwo = await axios.post(`/api/getPitchesByPitcher/${pitcherTwo}`)
                setPlayerTwoPitches(pitchesPlayerTwo.data);
                           


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
        <div className = "grid grid-cols-2 ml-20 mb-20 overflow-y-auto max-h-[50rem]  min-h-[50rem] bg-gray-200">


            <div className = "flex flex-col items-center justify-center overflow-hidden">
            <div className="ml-10  mb-20 items-center justify-center h-full w-2/3 bg-white rounded-xl overflow-hidden">
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Player 1 - {pitcherOne.length? pitcherOne: 'No comparison'}  </h1>
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl">Velocity by pitch type:  </h1>
                    {PlayerOnePitches.map((pitch, index) => {
                        return(
                        

                            <h1 key={index} className = "items-center justify-center text-left ml-20 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch['velocity']} Miles per Hour </h1>


                        )
                    })}
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl"> Horizontal Movement by pitch type:  </h1>
                    {PlayerOnePitches.map((pitch, index) => {
                        return(
                            <h1 key = {index} className = "items-center justify-center text-left ml-20 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch["x-break"]} inches (x-Break), {pitch.tail} inches (tail)</h1>
                        )
                    })}
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl"> Vertical Movement by pitch type:  </h1>
                    {PlayerOnePitches.map((pitch, index) => {
                        return(
                            <h1 key = {index} className = "items-center justify-center text-left ml-20 mb-5 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch["z-break"]} inches (z-Break), {pitch['rise']} inches (rise)</h1>
                        )
                    })}
                </div>
            </div>
            <div className = "flex flex-col items-center justify-center overflow-hidden">
            <div className="ml-10    mb-20 items-center justify-center h-full w-2/3 bg-white rounded-xl overflow-hidden">
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Player 2 - {pitcherTwo.length? pitcherTwo: 'No comparison'}  </h1>
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl">Velocity by pitch type:  </h1>
                    {PlayerTwoPitches.map((pitch, index) => {
                        return(
                            <h1 key={index} className = "items-center justify-center text-left ml-20 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch['velocity']} </h1>
                        )
                    })}
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl"> Horizontal Movement by pitch type:  </h1>
                    {PlayerTwoPitches.map((pitch, index) => {
                        return(
                            <h1 key={index} className = "items-center justify-center text-left ml-20 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch["x-break"]} inches (x-Break), {pitch.tail} inches (tail)</h1>
                        )
                    })}
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-xl"> Vertical Movement by pitch type:  </h1>
                    {PlayerTwoPitches.map((pitch, index) => {
                        return(
                            <h1 key={index} className = "items-center justify-center text-left ml-20 mb-5 font-light  mt-5  text-sm font-mono">{pitch['type']} - {pitch["z-break"]} inches (z-Break), {pitch['rise']} inches (rise)</h1>
                        )
                    })}
                </div>
            </div>
        </div>






       
        </div>
        </>
    )
}
export default Page
