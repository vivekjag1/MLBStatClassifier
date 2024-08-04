"use client"; 
import { useEffect } from "react"
import axios from "axios"



const Page = () => {
    useEffect( () => {
        const test = async () => {
            const res = await axios.get('/api/myRoute')
            return res
        }
        test().then(console.log)

        
    })

    return (
        <div className = " grid grid-cols-2  ml-20 overflow-hidden">
            <div className="items-center justify-center text-center h-screen  bg-gray-200 rounded-tr-xl rounded-br-xl shadow-xl">
                <h1 className = "items-center justify-center text-center font-mono text-2xl">Pitch Data</h1>
            </div>
            <div className="items-center justify-center text-center">HI</div>

        </div>
    )
}
export default Page