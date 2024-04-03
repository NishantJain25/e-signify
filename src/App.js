import { useState } from 'react';
import './App.css';
import Canvas from './components/canvas/canvas';
import Dropdown from './components/dropdown/dropdown';
import ColorSelector from './components/color-selector/color-selector';

function App() {
  const [lineWidth, setLineWidth] = useState(1)
  const [lineColor, setLineColor] = useState('rgb(0,0,0)')
  
  return (
    <div className="App">
      <Canvas lineWidth={lineWidth} strokeStyle={lineColor}/>
      <Dropdown lineWidth={lineWidth} setLineWidth={setLineWidth}/>
      <ColorSelector labelText={"Select line color"} currentColor={lineColor} selectColor={setLineColor}/>
    </div>
  );
}

export default App;
