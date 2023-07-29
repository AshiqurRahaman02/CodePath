import React from 'react'

import "../styles/Loading.css"

function Loading() {
  return (
    <div id='loader'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading
