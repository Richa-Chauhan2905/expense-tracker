import React from "react";
import icon from '../assets/piggy_bank.png'

const Navbar = () => {
    return(
        <div className="bg-blue-900 text-white h-20 flex items-center gap-3">
            <img src={icon} alt="icon" className="w-12 mt-3 mb-4 ml-2"/>
            <p className="text-3xl font-medium">SpendWise</p>
        </div>
    )
}

export default Navbar