import React, { Component } from "react";
import './Button.css'

function Button ({ children, size, color, width, handleClick, disabled }){ //children:버튼 컴포넌트로 들어오는 컨텐츠
  return <button className={`button ${size} ${color} ${width} ${disabled ? 'blocked' : ''}`} onClick={handleClick} disabled={disabled}>{children}</button>
  // 재활용을 할 스타일들을 따로 빼줘서 props로 받아온다
}

export default Button

Button.defaultProps = {
  size: 'medium',
  color: 'tomato',
  disabled: false,
}
