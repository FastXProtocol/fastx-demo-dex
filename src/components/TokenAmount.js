import React from 'react'

const TokenAmount = (props) => {

  return <span className={props.className || "value"} >{ props.number} {props.token || ''}</span>

};

export default TokenAmount;
