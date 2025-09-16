import React from 'react'

const Recent = (props) => {
  return (
    <div className='text-black border h-10 flex items-center justify-evenly rounded mb-2'>
        <div>${props.amount}</div>
        <div>{props.type}</div>
        <div>{props.date}</div>
    </div>
  )
}

export default Recent