"use client"; 
import {JSX, SetStateAction, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import CreateComparisonForm from "./CreateComparisonForm"

interface ModalProps{ 
    open:boolean; 
    handleClose: () => void; 
}
const ComparisonModal = (props:ModalProps)  =>{
    const [modalOpen, setModalOpen] = useState<boolean>(props.open); 
    return(
        <>
            <Dialog open={props.open} onOpenChange={(isOpen) => {if(props.open) props.handleClose()}}>
                <DialogContent>
                    <DialogHeader className = "flex items-center font-black font-serif text-3xl">
                        <DialogTitle className="text-3xl">Create a comparison</DialogTitle>
                        <DialogDescription className = "text-sm text-center font-black">Compare players based on velocity, movement, and more</DialogDescription>
                    </DialogHeader>
                    <CreateComparisonForm handleClose={props.handleClose}/>

                    <DialogFooter> 
                        <Button onClick={props.handleClose}> Close </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
       </>

    )

}
export default ComparisonModal