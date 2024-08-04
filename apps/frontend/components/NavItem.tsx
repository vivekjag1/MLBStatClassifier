 import Link from "next/link"
 interface NavItemProps{
    linkTo: string; 
    title: string; 
    children: React.ReactNode; 
    open: boolean; 
 }

 const NavItem = (props:NavItemProps) => {
    return (
            <Link href={props.linkTo} className = "mt-10 flex cursor-pointer p-1 rounded hover:stroke-0 bg-red-800 hover:bg-blue-800 transition-colors duration-200 place-items-center gap-3  " > 
                {props.children}
                {props.open && <p className = " text-white ml-3 text-xl font-mono whitespace-nowrap ">{props.title}</p>}
            </Link>
    )
 }
 export default NavItem