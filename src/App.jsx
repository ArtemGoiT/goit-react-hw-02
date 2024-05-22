import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

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
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;

//   useState и useEffect - это React хуки.useState используется для создания состояния feedback,
// которое хранит информацию о количестве "хороших", "нейтральных" и "плохих" отзывов
//   .useEffect используется для сохранения этого состояния в локальном хранилище браузера при его изменении.

//   updateFeedback - это функция, которая обновляет состояние feedback, увеличивая количество определенного типа отзывов.

//   reset - функция, которая сбрасывает состояние feedback до начального значения.

//   Компоненты Description, Options, Feedback и Notification отвечают за отображение соответствующих частей пользовательского интерфейса.

//   В App компоненте возвращается разметка, содержащая описанные выше компоненты.
//   В зависимости от количества общих отзывов(totalFeedback), отображается либо компонент Feedback с общей статистикой,
// либо компонент Notification, указывающий, что отзывов пока нет.
