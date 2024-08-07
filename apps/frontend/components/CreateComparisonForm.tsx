"use client"; 
import React, { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import { Player } from "./customColumnsPlayer"
import { ComparisonProvider, useComparisonContext } from "@/contexts/comparisonContext";
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  type PitcherRes = {
    handedness: string; 
    pitcherName:string; 
    playerID:number; 
    team: string; 
  }
  interface props{ 
    handleClose: () => void; 
  }

const CreateComparisonForm = (props:props) => {
    const [playerList, setPlayerList] = useState<string[]>([]); 
   
    const {pitcherOne, pitcherTwo} = useComparisonContext(); 
     const [playerOneName, setPlayerOneName] = useState<string>(pitcherOne); 
    const [playerTwoName, setPlayerTwoName] = useState<string>(pitcherTwo); 
    const [fetched, setFetched] = useState<boolean>(false); 
    const {setPitcherOne, setPitcherTwo} = useComparisonContext(); 

    useEffect(() => { 
        const makeRequest = async () => {
            const data = await axios.get('/api/getPitcherNames'); 
            setPlayerList(data.data); 
            return data.data
        }
        if(!fetched){
            const data = makeRequest().then(); 
            setFetched(true); 
        }
        else{
            return; 
        }
    })
    const handlesubmit =  (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        setPitcherOne(playerOneName);
        setPitcherTwo(playerTwoName); 
        props.handleClose(); 
    }
    const handleClear = () => {
        setPlayerOneName(''); 
        setPlayerTwoName(''); 
    }
    return (
        <ComparisonProvider>
        <form 
            onSubmit={handlesubmit}
            style = {{
                display:"flex", 
                flexDirection:"column", 
                justifyContent:"center", 
                alignItems:"center"
            }}>
                <div className = "mb-5 w-full">
            <Select  value={playerOneName} onValueChange={(value:string) => setPlayerOneName(value)}>
                <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select player 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {playerList.map((player, index) =>{
                                return(
                                    <SelectItem key = {index} className = "font-mono text-black" value = {player}>{player}</SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <Select  value={playerTwoName} onValueChange={(value:string) => setPlayerTwoName(value)}>
                <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select player 2" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {playerList.map((player, index) =>{
                                return(
                                    <SelectItem key = {index} className = "font-mono text-black" value = {player}>{player}</SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className = "flex flex-row px-5">
                    <Button  variant="destructive" className="m-[2rem] w-[7rem]" type="button" onClick = {handleClear}>Clear </Button>
                     <Button  variant="default" className="m-[2rem] w-[7rem] "  type = "submit" onClick={handlesubmit}>Submit</Button>
                </div>


            </form>
            </ComparisonProvider>
    )
}
export default CreateComparisonForm