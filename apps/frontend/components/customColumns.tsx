"use client"; 
import {ColumnDef} from "@tanstack/react-table"
export type Pitch = {
    pitchID:number; 
    pitcherName:string; 
    rise:number; 
    tail:number; 
    type:string; 
    velocity:number; 
    xBreak:number; 
    zBreak:number; 
}
export const columns:ColumnDef<Pitch>[] = [
    {
        accessorKey:"pitcherName", 
        header: "Pitcher Name"
    }, 
    {
        accessorKey:"velocity", 
        header:"Velocity"
    }, 
    {
        accessorKey:"x-break", 
        header:"X-Break"
    }, 
    {
        accessorKey:"z-break", 
        header:"Z-Break"
    }, 
    {
        accessorKey:"rise", 
        header:"Rise"
    }, 
    {
        accessorKey:"tail", 
        header:"Tail"
    }, 
    {
        accessorKey:"type", 
        header:"Pitch Type"
    }
]


