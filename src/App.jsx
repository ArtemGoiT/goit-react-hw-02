import { useState, useEffect } from "react";

import "./App.css";

import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const saveFeedback = localStorage.getItem("feedback");
    return saveFeedback
      ? JSON.parse(saveFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });
  const total = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback =
    total > 0 ? Math.round((feedback.good / total) * 100) : 0;

  const updateFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const reset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        reset={reset}
        totalFeedback={total}
      />
      {total > 0 ? (
        <Feedback
          feedback={feedback}
          total={total}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
