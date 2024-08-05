"use client"; 
import { useEffect } from "react"
import axios from "axios"
import ClassifierForm from "../../components/classifierForm"


const Page = () => {
    useEffect( () => {
        const test = async () => {
            const res = await axios.get('/api/myRoute')
            return res
        }
        test().then(console.log)

        
    })

    return (
        <div className = " grid grid-cols-2 min-h-screen ml-20 overflow-hidden bg-gray-200">
            <div className = "flex flex-col items-center justify-center">
            <div className=" ml-10 items-center justify-center  h-2/3 w-2/3  bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl ">
                <h1 className = "items-center justify-center text-center font-mono font-bold mt-5  text-2xl">Pitch Data</h1>
                <h1 className = "items-center justify-center text-center font-light  mt-5  text-lg">Classify a pitch by its velocity, z-break, rise, x-break, and tail </h1>

                <ClassifierForm/>
            </div>
            </div>
           
            <div className="items-center justify-center text-center">HI</div>

        </div>
    )
}
export default Page