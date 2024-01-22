import { useState } from 'react'

const StatisticLine = ({name, value}) => <p>{name} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  if(all){
    return (
     /* <>
        <h1>Statistics</h1>
        <StatisticLine name={'good'} value={good}/>
        <StatisticLine name={'neutral'} value={neutral}/>
        <StatisticLine name={'bad'} value={bad}/>
        <StatisticLine name={'all'} value={all}/>
        <StatisticLine name={'avarage'} value={(good - bad)/all}/>
        <StatisticLine name={'positive'} value={good/all*100}/>
      </>*/
      <>
      <br/>
      <br/>
      <table border="1">
        <thead>
          <tr>
              <th>Statistic</th>
              <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td>good</td>
              <td>{good}</td>
          </tr>
          <tr>
              <td>neutral</td>
              <td>{neutral}</td>
          </tr>
          <tr>
              <td>bad</td>
              <td>{bad}</td>
          </tr>
          <tr>
              <td>all</td>
              <td>{all}</td>
          </tr>
          <tr>
              <td>avarage</td>
              <td>{(good - bad)/all}</td>
          </tr>
          <tr>
              <td>positive</td>
              <td>{good/all*100} %</td>
          </tr>
        </tbody>
    </table>
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