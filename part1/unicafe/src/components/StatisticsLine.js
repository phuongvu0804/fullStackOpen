import React from "react";

const StatisticsLine = ({ label, data }) => {
  return (
    <tr>
      <td>{label} </td>
      <td>{data}</td>
    </tr>
  );
};

export default StatisticsLine;
