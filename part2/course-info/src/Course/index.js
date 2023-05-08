import React from 'react'
import Content from './components/Content'
import Sum from './components/Sum'

const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts}/>
      <Sum parts={course.parts}/>
    </div>
  )
}

export default Course