"use client"; 
import { createContext, useContext, useState} from "react";

interface ComparisonContextType{
    pitcherOne: string; 
    setPitcherOne: (value:string) => void; 
    pitcherTwo: string; 
    setPitcherTwo: (value:string) => void; 

}
const initalContext:ComparisonContextType = { 
    pitcherOne:'',
    setPitcherOne: () => {},
    pitcherTwo: '',
    setPitcherTwo:() => {}
}
const ComparisonContext = createContext<ComparisonContextType>(initalContext); 
export const useComparisonContext = () => {
    const context = useContext(ComparisonContext);
  
    return context;
  };
interface Props{
    children: React.ReactNode
}
export function ComparisonProvider(props:Props){
    const [playerOneName, setPlayerOneName] = useState<string>(''); 
    const [playerTwoName, setPlayerTwoName] = useState<string>(''); 
    const setPlayerOneEvent = (value:string) =>{
        setPlayerOneName(value)
    }
    const setPlayerTwoEvent = (value:string) => { 
        setPlayerTwoName(value); 
    }




    const value:ComparisonContextType = {
        pitcherOne: playerOneName, 
        setPitcherOne: setPlayerOneEvent, 
        pitcherTwo: playerTwoName,
        setPitcherTwo: setPlayerTwoEvent, 
        }
    return <ComparisonContext.Provider value={value}>
        {props.children}
        
    </ComparisonContext.Provider>
}