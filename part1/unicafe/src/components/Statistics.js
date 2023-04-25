import React from "react";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad, all }) => {
  const calculatePositivePercen = () => {
    if (good !== 0) {
      return `${(good / all) * 100}%`;
    }
  };

  const renderStatistics = () => {
    if (all === 0) {
      return <p>No feedback is given</p>;
    }

    return (
      <table>
        <tbody>
          <StatisticsLine label="Good" data={good} />
          <StatisticsLine label="Neutral" data={neutral} />
          <StatisticsLine label="Bad" data={bad} />
          <StatisticsLine label="All" data={all} />
          <StatisticsLine label="Positive" data={calculatePositivePercen()} />
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Statistics</h2>
      {renderStatistics()}
    </div>
  );
};

export default Statistics;
