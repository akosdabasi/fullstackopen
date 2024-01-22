import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  if(all){
    return (
      <>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>avarage {(good - bad)/all}</p>
        <p>positive {good/all*100} %</p>
      </>
    ) 
  }

  return (
    <>
    <h1>Statistics</h1>
    <p>No feedback given</p>
    </>
  )

 
}

const Button = (props) => <button onClick = {props.handleOnClick}>{props.text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleOnClick={() => setGood(good + 1)} text='good'/>
      <Button handleOnClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleOnClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App