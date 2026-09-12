import React from "react"
import "../css/numberBox.css"

export default function NumbersBox ({num, whichNum}) {

    // generateAllNewDice()
    return (
        <div className="number">
            {num.isHeld 
            ? 
            <button style={{backgroundColor:"#59E391"}} disabled={num.isHeld}>{num.value}</button> 
            :
            <button onClick={()=>{whichNum(num.id)}} >{num.value}</button>}
                
        </div>
    )
}