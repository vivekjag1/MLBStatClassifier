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
        <div className = "text-center font-mono ">
            Hello World
        </div>
    )
}
export default Page