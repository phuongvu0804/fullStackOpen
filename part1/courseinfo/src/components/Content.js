import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return <div>
    {parts.map((item, index) => <Part key={index} part={item.name} exercises={item.exercises}/>)}  
  </div>;
};

export default Content;
