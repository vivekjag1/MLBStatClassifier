"use client"; 
import {ColumnDef} from "@tanstack/react-table"
export type Player = {
    playerID:number; 
    name:string; 
    handedness:string; 
    team:string; 

}
export const columnsPlayers:ColumnDef<Player>[] = [
    {
        accessorKey:"playerID", 
        header: "Player ID"
    }, 
    {
        accessorKey:"pitcherName", 
        header:"Name"
    }, 
    {
        accessorKey:"handedness", 
        header:"Handedness"
    }, 
    {
        accessorKey:"team", 
        header:"Team"
    }, 
]


