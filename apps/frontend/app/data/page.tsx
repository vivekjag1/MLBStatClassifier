import { Pitch, columns } from "@/components/customColumns";
import { CustomTable } from "@/components/customTable";
import axios from "axios"; 

const fetchData = async() => {
    const data = await axios.get('/api/getPitches'); 
    return data.data; 
}

export default async function Page(){
    const data = await fetchData(); 
    return(
        <>
        <div className = "text-center font-mono text-3xl">
            Pitch Data
            <div className="container mx-auto py-10 font-serif items-center justify-center">
            <CustomTable columns={columns} data={data} />
         </div>    
        </div>
       
      </>
    )
}