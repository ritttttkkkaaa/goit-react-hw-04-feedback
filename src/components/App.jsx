import { useState } from 'react';
import Statistics from './statistics/Statistics';
import FeedbackOptions from './feedbackOptions/FeedbackOptions';
import Section from './section/Section';
import Notification from './notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)

  const feedbackOptions = option => {
    switch(option) {  
      case 'good':
      setGood(prevGood => prevGood + 1);
      break;
      case 'neutral':
      setNeutral(prevNeutral => prevNeutral + 1);
      break;
      case 'bad' :
      setBad(prevBad => prevBad +1);
      break;
      default:
      return;
    }
  }

  const totalFeedback = () => {
    return good + neutral + bad;
  };
  
  const positiveFeedbackPercentage = () => {
    return Math.round((good / totalFeedback()) * 100) || 0;
  }

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={feedbackOptions}
        />
     </Section>
     <Section title="Statistics">
        {totalFeedback() ? (
        <Statistics
           good={good}
           neutral={neutral}
           bad={bad}
           total={totalFeedback()}
           positivePercentage={positiveFeedbackPercentage()}
         />
        ) : (
        <Notification message="There is no feedback" />
       )}
      </Section>
   </div>
 );
}
