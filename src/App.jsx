import { useState, useEffect } from 'react'
import './css/App.css'
import NumbersBox from './components/NumbersBox'
import confetti from "canvas-confetti";

function App() {
  const [dicenuM, setDiceNum ] = useState(generateAllNewDice())
  const [count, setCount] = useState(0)

  var allTrue = () => {
    var tempHeld = true
      dicenuM.map((value) => {
      if (value.isHeld === false) {
        tempHeld = false
      }
    })
    return tempHeld
  }

  var allSame = () => {
    var allvalueSame = true
    const tempval = dicenuM[0]
    dicenuM.map((val) => {
      if (tempval.value != val.value) {
        allvalueSame = false
      }
    })
    return allvalueSame
  }

  // console.log("values are all same? " + allSame())
  //  console.log("values are all true? " + allTrue())

  if (allTrue() && allSame()) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    // console.log ("game won")
  }


  // const handleCelebrate = () => {
  //   confetti({
  //     particleCount: 100,
  //     spread: 70,
  //     origin: { y: 0.6 },
  //   });
  // }

  

  function generateAllNewDice () {
    var objNum = []
    for ( var i =1; i<=10; i++) {
        var temp = Math.ceil((Math.random()) * 6)
        objNum.push ({
          id: i,
          value: temp,
          isHeld: false
        })
      
    }
    return objNum
    }
  
    function rollDice () {
      setCount(prev => prev+1)

      setDiceNum(oldDice =>
        oldDice.map ((die) =>
          die.isHeld ? die : {...die, value:  Math.ceil((Math.random()) * 6)}
        )
      )
    }

    function resetGame () {
      setDiceNum (generateAllNewDice())
      setCount(0)
    }

    function numberClicked(id) {
      console.log("hey there ", id)
      setDiceNum(prev=>
        prev.map(val => 
          val.id === id ? {...val, isHeld: !val.isHeld} : val
        )
      )

    }

  useEffect(()=> {
  },[dicenuM])
  


  return (
    <main>
      <div className='maincontianer'>
        <div className='innerMain'>
          <div className='gameSection'>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h1> {count} </h1>

            <div className='numberInner'>

              {dicenuM.map((num, key) => {
                return (
                   <NumbersBox key={key} whichNum={numberClicked}
                   num={num}/>
                )
              })}
            </div>
            <div className='rollButton'>
              {allTrue() && allSame() 
              ?
              <button style={{backgroundColor:"#DD2D4A", fontSize:"20px"}} onClick={resetGame}> Reset game </button>
              :
              <button disabled={(allTrue() && allSame())} onClick={rollDice}> Roll </button>
              }
              {/* <button disabled={(allTrue() && allSame())} onClick={rollDice}> Roll </button>
              <button onClick={resetGame}> Reset </button> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
