 import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
const ClassifierForm = () => {
    const [velocity, setVelocity] = useState<number>()
    const [zbreak, setZBreak] = useState<number>(); 
    const [rise, setRise] = useState<number>(); 
    const [xbreak, setXBreak] = useState<number>(); 
    const [tail, setTail] = useState<number>(); 
    


    const handleSubmit = async(e: React.SyntheticEvent) =>{
        e.preventDefault(); 
        console.log("eegeeekeeey"); 
        const data =  await axios.post('/api/makeClassification', {
            "velocity": velocity, 
            "z-break": zbreak, 
            "rise": rise, 
            "tail": tail,
            "x-break":xbreak
        }); 
        console.log("the data is", data)


        const types:string[] = ["4-Seam Fastball","Changeup", "Curveball","Cutter", "Sinker", "Slider",  "Split-Finger", "Sweeper",  "Slurve" ]; 
        const pitchType = types[data.data]
        console.log("eee", pitchType)
    }
    return (
        <form 
            onSubmit={handleSubmit}
            style = {{
                display:"flex", 
                flexDirection:"column", 
                justifyContent:"center", 
                alignItems:"center"
            }}>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch velocity in miles per hour" value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch break in z-direction in inches" value={zbreak} onChange={(e) => setZBreak(parseFloat(e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch rise in inches" value={rise} onChange={(e) => setRise(parseFloat(e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch break in the X-direction in inches" value={xbreak} onChange={(e) => setXBreak(parseFloat(e.target.value))}/>
                <Input type = "number" className= "w-3/4 mt-5 " placeholder="Enter the pitch tail in inches" value={tail} onChange={(e) => setTail(parseFloat(e.target.value))}/>
                <div className="mt-20 flex flex-row px-5">
                    <Button variant="destructive" className="m-[2rem] w-[7rem]" type="button">Clear </Button>
                    <Button variant="default" className="m-[2rem] w-[7rem] " type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
    )
}
export default ClassifierForm