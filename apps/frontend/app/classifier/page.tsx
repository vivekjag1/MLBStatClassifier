"use client"; 
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import ClassifierForm from "../../components/classifierForm"
import Image from "next/image"
import { PitchProvider, usePitchContext } from "@/contexts/pitchContext";

const Page = () => {
    const {pitch} = usePitchContext(); 
    const [pitchString, setPitchString] = useState<string>('')
    const [averages, setAverages] = useState<number[]>([])
    const [fetched, setFetched] = useState<boolean>(false); 
    const [leadersNames, setLeadersNames] = useState<string[]>([])
    const [leadersStats, setLeadersStats] = useState<number[]>([])

    
    const pitchDescriptions = [
        "This pitch has high velocity and low movement",
        "This pitch has low velocity and relies on late movement",
        "This pitch has low velocity and has high vertical movement",
        "This pitch has high velocity and moves horizontally",
        "This pitch can have high velocity and moves downwards",
        "This pitch has medium velocity and high spin and movement",
        "This pitch has low velocity and high break",
        "This pitch has medium to high velocity with extreme spin ",
        "This pitch has low velocity with extreme spin "
    ];
    useEffect(() =>{
        const fetchAverages = async() =>{
            const build = await axios.get('/api/buildArrays')
            const data = await axios.get('/api/getAverages'); 
            setAverages(data.data)
            const leaders = await axios.get('/api/getLeagueLeaders'); 
            setLeadersNames(leaders.data['players'])
            setLeadersStats(leaders.data['stats']); 
            console.log("EEEEEEEEEEEEEE", leaders)
        }
        if(!fetched){
            fetchAverages().then(); 
            setFetched(true)
        }
        else{
            return 
        }
    })
  
    const pitches:string[] = ["4-Seam Fastball", "Changeup",  "Curveball","Cutter","Sinker", "Split-Finger", "Sweeper", "Slurve" ]
    useEffect(() =>{
       
        console.log("fml")
        if(pitch == -1 || pitch == undefined){
            setPitchString("No Pitch!")
        }
        else{
            setPitchString(pitches[pitch])
        }

    }, [pitch])

    return (
        <>
        <div className = " grid grid-cols-2  ml-20 overflow-y-hidden h-screen bg-gray-200">
            <div className = "flex flex-col items-center justify-center overflow-hidden">
            <div className="ml-10 mt-10 items-center justify-center w-2/3 bg-white rounded-xl overflow-hidden">
                    <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Statistics Glossary </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Velocity (MPH) - The speed of the pitch as it crosses home plate </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Z-Break (inches) - The pitch break in the Z-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">Rise (inches) - The vertical pitch movement relative to its expected trajectory </h1>
                    <h1 className = "items-center justify-center text-left ml-2 font-light  mt-5  text-sm font-mono">X-Break (inches) - The pitch break in the x-direction </h1>
                    <h1 className = "items-center justify-center text-left ml-2 mb-5 font-light  mt-5  text-sm font-mono">Tail (inches) - The pitch movement realative to its expected trajectory </h1>
                </div>
                <div className=" ml-10 mt-5 items-center justify-center  w-2/3  bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl  ">
                    <h1 className = "items-center justify-center text-center font-mono font-bold  text-2xl">Pitch Data</h1>
                    <ClassifierForm/>
                </div>
            </div>
                 <div className="flex flex-col  ml-10 mt-10 items-center  h-1/12 w-2/3  bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl ">
                 
                    <h1 className = "items-center justify-center text-center font-mono font-bold  mt-10 text-2xl">Classification: {pitch!=-1? pitchString: "No Classification"} </h1>
                    <h1 className = "items-center justify-center text-center font-mono font-bold  text-sm">Model Accuracy: 92% </h1>
                    <h1 className = "items-center justify-center text-center font-mono font-bold  mt-5 text-2xl">Description: </h1>

                    <h1 className = "items-center justify-center text-left font-mono font-bold  text-lg"> {pitch!=-1? pitchDescriptions[pitch]: "No Classification"} </h1>
                    <div className = "flex items-center justify-center">
                 </div>
                 <div className="col-span-1 h-full">
                    <h1 className = "items-center justify-center text-center font-mono font-bold  mt-5 text-2xl">Training Data Averages: </h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg ">Velocity: {averages[0]} Miles Per Hour</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Z-Break: {averages[1]} Inches</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Rise: {averages[2]} Inches</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">X-Break: {averages[3]} Inches </h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Tail: {averages[4]} Inches</h1>
                    <h1 className = "items-center justify-center text-center font-mono font-bold  mt-5 text-2xl">League Leaders: </h1>

                    <h1 className = "items-center justify-center text-left font-mono   text-lg ">Velocity: {leadersNames[0]} - {leadersStats[0]} Miles Per Hour</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Z-Break: {leadersNames[1]} - {leadersStats[1]} Inches</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Rise: {leadersNames[2]} - {leadersStats[2]} Inches</h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">X-Break: {leadersNames[3]} - {leadersStats[3]} Inches </h1>
                    <h1 className = "items-center justify-center text-left font-mono   text-lg mt-5">Tail: {leadersNames[4]} - {leadersStats[4]} Inches</h1>

                 </div>
                </div>
           
            <div className="flex flex-col items-center mt-20">
                
           

            </div>

        </div>
        </>
    )
}

export default Page