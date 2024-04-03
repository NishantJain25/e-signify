import React from 'react'
import './color-selector.css'
const ColorSelector = ({labelText,currentColor, selectColor}) => {
    const colorList = ["rgb(172,50,53)","rgb(0, 107, 136)","rgb(0,0,0)", "rgb(255,255,255)"]
  return (
    <div>
        <p className='label'>{labelText}</p>
        <div className="row">
        {colorList.map((color,i) => <div className='color-container' style={{backgroundColor: color, border: `${color === currentColor ? '2px solid black' : '1px solid black'}`}} onClick={() => selectColor(color)} key={i}></div>)}
        </div>
    </div>
  )
}

export default ColorSelector
