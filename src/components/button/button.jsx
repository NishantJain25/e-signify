import React from 'react'

const Button = ({buttonText, onClickHandler, buttonType, isActive=true}) => {
  return (
    <button className={`button`} onClick={onClickHandler} disabled={!isActive}>
      {buttonText}
    </button>
  )
}

export default Button
