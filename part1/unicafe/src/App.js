import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClick = (feedbackType) => {
    switch (feedbackType) {
      case "good": {
        const updatedStatistics = good + 1;
        setGood(updatedStatistics);
        setAll(updatedStatistics + neutral + bad);
        break;
      }

      case "neutral": {
        const updatedStatistics = neutral + 1;
        setNeutral(updatedStatistics);
        setAll(good + updatedStatistics + bad);
        break;
      }

      case "bad": {
        const updatedStatistics = bad + 1;
        setBad(updatedStatistics);
        setAll(good + neutral + updatedStatistics);
        break;
      }

      default:
        break;
    }
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => handleClick("good")} text="Good" />
        <Button handleClick={() => handleClick("neutral")} text="Neutral" />
        <Button handleClick={() => handleClick("bad")} text="Bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
