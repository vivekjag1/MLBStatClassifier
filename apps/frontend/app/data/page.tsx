"use client"
import { Pitch, columnsPitches } from "@/components/customColumnsPitches";
import { Player, columnsPlayers } from "@/components/customColumnsPlayer";
import { CustomTable } from "@/components/customTable";
import axios from "axios"; 
import { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

export default   function Page(){
    const [pitchData, setPitchData] = useState<Pitch[]>([])
    const [pitchers, setPitchers] = useState<Player[]>([]); 
    const [fetched, setFetched] = useState<boolean>(false); 
    useEffect(() => {
        const fetchData = async() => {
            const data = await axios.get('/api/getPitches'); 
            setPitchData(data.data)
            const pitchers = await axios.get('/api/getAllPitchers'); 
            setPitchers(pitchers.data)
            return data.data; 
        }

        if(!fetched){
            fetchData().then(); 
            setFetched(true); 
        }
        else{
            return; 
        }

    })
    return(
        <>
        <div className = " font-mono text-3xl">
       

            <div className="container mx-auto py-10 font-mono items-center justify-center">
            <Tabs defaultValue="account" className="items-center justify-center ">
            <TabsList>
                <TabsTrigger value="account">Pitches</TabsTrigger>
                <TabsTrigger value="password">Players</TabsTrigger>
            </TabsList>
            <TabsContent value="account"> <CustomTable columns={columnsPitches} data={pitchData} /></TabsContent>
            <TabsContent value="password"><CustomTable columns={columnsPlayers} data={pitchers} /></TabsContent>
        </Tabs>
           
         </div>    
        </div>
       
      </>
    )
}