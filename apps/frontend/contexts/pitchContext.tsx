"use client"; 
import { createContext, useContext, useState} from "react";

interface PitchContextType{
    pitch:number; 
    setPitch: (value:number) => void; 
}
const initalContext:PitchContextType = { 
    pitch: -1, 
    setPitch: () => {}
}
const PitchContext = createContext<PitchContextType>(initalContext); 
export const usePitchContext = () => {
    const context = useContext(PitchContext);
  
    return context;
  };
interface Props{
    children: React.ReactNode
}
export function PitchProvider(props:Props){
    const [pitch, setPitch] = useState<number>(-1); 
    const setPitchEvent = (value:number) =>{
        setPitch(value)
    }
    const value:PitchContextType = {
        pitch:pitch, 
        setPitch: setPitchEvent
        }
    return <PitchContext.Provider value={value}>
        {props.children}
        
    </PitchContext.Provider>
}