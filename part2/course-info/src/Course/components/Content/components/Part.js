import React from 'react'

const Part = ({data}) => {
  return (
    <p>
        <span>{data.name} </span>
        <span>{data.exercises}</span>
      </p>
  )
}

export default Part