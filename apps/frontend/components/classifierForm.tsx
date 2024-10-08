 import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import { PitchProvider, usePitchContext } from "@/contexts/pitchContext"

const ClassifierForm = () => {
    const [velocity, setVelocity] = useState<string>()
    const [zbreak, setZBreak] = useState<string>(); 
    const [rise, setRise] = useState<string>(); 
    const [xbreak, setXBreak] = useState<string>(); 
    const [tail, setTail] = useState<string>(); 
    const {setPitch} = usePitchContext(); 
    const handleClear = () =>{
        setVelocity(''); 
        setZBreak(''); 
        setRise(''); 
        setXBreak(''); 
        setTail(''); 

    
    }



    const handleSubmit = async(e: React.SyntheticEvent) =>{
        e.preventDefault(); 
        const data =  await axios.post('/api/makeClassification', {
            "velocity": parseFloat(velocity!), 
            "z-break": parseFloat(zbreak!), 
            "rise": parseFloat(rise!), 
            "tail": parseFloat(tail!),
            "x-break":parseFloat(xbreak!)
        }); 
        setPitch(data.data['result'][0]); 



        const types:string[] = ["4-Seam Fastball","Changeup", "Curveball","Cutter", "Sinker", "Slider",  "Split-Finger", "Sweeper",  "Slurve" ]; 

    }
    return (
        <PitchProvider>
        <form 
            onSubmit={handleSubmit}
            style = {{
                display:"flex", 
                flexDirection:"column", 
                justifyContent:"center", 
                alignItems:"center"
            }}>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch velocity in miles per hour" value={velocity} onChange={(e) => setVelocity((e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch break in z-direction in inches" value={zbreak} onChange={(e) => setZBreak((e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch rise in inches" value={rise} onChange={(e) => setRise((e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch break in the X-direction in inches" value={xbreak} onChange={(e) => setXBreak((e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch tail in inches" value={tail} onChange={(e) => setTail((e.target.value))}/>
                <div className="mt-10 flex flex-row px-5">
                    <Button variant="destructive" className="m-[2rem] w-[7rem]" type="button" onClick={handleClear}>Clear </Button>
                    <Button variant="default" className="m-[2rem] w-[7rem] " type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
            </PitchProvider>
    )
}
export default ClassifierForm