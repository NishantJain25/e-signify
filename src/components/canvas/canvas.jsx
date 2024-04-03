import React, { useLayoutEffect, useRef, useState } from "react";
import "./canvas.css";
import Button from "../button/button";

const Canvas = ({lineWidth=1, strokeStyle="black", lineCap="round"}) => {
  const [isWrite, setIsWrite] = useState(false);
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  const [isDownloadable, setIsDownloadable] = useState(false)

  useLayoutEffect(() => {
    function updateSize() {
      console.log(window.innerWidth)
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

 
    return () => window.removeEventListener('resize', updateSize);
  }, []);
 
  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);

  const getTargetPosition = (event) => {
    console.log(event.clientX)
    console.log(canvasRef.current.getBoundingClientRect().left)
    console.log(event.clientX - canvasRef.current.getBoundingClientRect().left)
    if (event.touches && event.touches.length === 1) {
      const touch = event.touches[0];
      return [touch.clientX - canvasRef.current.getBoundingClientRect().left, touch.clientY - canvasRef.current.getBoundingClientRect().top];
    } else {
      return [event.clientX - canvasRef.current.getBoundingClientRect().left, event.clientY - canvasRef.current.getBoundingClientRect().top];
    }
    
  };

  const handleMouseDown = (event) => {
    setIsWrite(true);
    setIsDownloadable(true)
    canvasCtx.current = canvasRef.current.getContext("2d");
    canvasCtx.current.beginPath()
    const position = getTargetPosition(event);
    canvasCtx.current.moveTo(...position);
    canvasCtx.current.lineTo(...position);
    canvasCtx.current.lineWidth = lineWidth;
    canvasCtx.current.strokeStyle = strokeStyle;
    canvasCtx.current.lineCap = lineCap;
    canvasCtx.current.stroke();
  };
  const handleMouseMove = (event) => {
    if (!isWrite) return 
    if(canvasCtx.current){
      const position = getTargetPosition(event);
      canvasCtx.current.lineTo(...position);
      canvasCtx.current.lineWidth = lineWidth;
      canvasCtx.current.strokeStyle = strokeStyle;
      canvasCtx.current.lineCap = lineCap;
      canvasCtx.current.stroke();
    }
    
  };

  const handleMouseUp = () => {
    setIsWrite(false);
  };

  const clearPad = () => {
    canvasCtx.current?.clearRect(0,0,canvasRef.current.width, canvasRef.current.height)
    setIsDownloadable(false)
  }

  const downloadImage = (event,type) => {
    if(!isDownloadable) return
    const link = event.currentTarget
    link.setAttribute('download', `signature.${type}`)
    let image = canvasRef.current.toDataURL(`image/${type}`)
    link.setAttribute('href', image)
  }

  return (
    <div className="container">
      <p>Signature</p>
      <div className="canvas-container">
        <canvas
          id="signature-pad"
          width={size[0] < 600 ? size[0]-60 : 500}
          height={size[0] < 600 ? 150 : 200}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleMouseMove}
          onTouchCancel={handleMouseUp}
          ref={canvasRef}
        ></canvas>
        <Button buttonText={"Clear"} onClickHandler={clearPad}/>
      </div>
      <div className="action">
        <a id="download-png" href="download" onClick={(e) => downloadImage(e,'png')}><Button buttonText={"Download as PNG"} isActive={isDownloadable}/></a>
      </div>
    </div>
  );
};

export default Canvas;
