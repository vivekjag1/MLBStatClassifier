"use client"; 
import { Pitch, columns } from "@/components/customColumns";
import { CustomTable } from "@/components/customTable";
import axios from "axios"; 
import { useEffect, useState } from "react";



export default   function Page(){
    const [pitchData, setPitchData] = useState<Pitch[]>([])
    const [fetched, setFetched] = useState<boolean>(false); 
    useEffect(() => {
        const fetchData = async() => {
            const data = await axios.get('/api/getPitches'); 
            setPitchData(data.data)
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
        <div className = "text-center font-mono text-3xl">
            Pitch Data
            <div className="container mx-auto py-10 font-serif items-center justify-center">
            <CustomTable columns={columns} data={pitchData} />
         </div>    
        </div>
       
      </>
    )
}