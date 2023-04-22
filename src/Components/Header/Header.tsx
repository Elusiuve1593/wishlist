import { useLocation } from "react-router-dom"

export const Header = () => {
  const location = useLocation()
  return (
    <div className={location.pathname === "/wish" ? "hidden" : "bg-[#272720] text-4xl h-20 w-full uppercase"}>
      <div className="text-[#d4d4d2] pt-4 pl-4" >My wishlist</div>
    </div>
  )
}