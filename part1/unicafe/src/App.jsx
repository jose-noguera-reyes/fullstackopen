import { useState } from 'react'

const Header = ({ text }) => {
  console.log("header:", text)
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const StatisticLine = ({ stat, counter }) => {
  return (
    <>
      <tr>
        <td>{stat}</td>
        <td>{counter}</td>
      </tr>
    </>
  )
}

const Statistics = ({ statsGood, statsNeutral, statsBad }) => {
  const all = statsGood + statsNeutral + statsBad
  const average = (statsGood - statsBad)/all
  const positive = (statsGood*100)/all
  const positiveString = (String(positive) + " %")

  if (all === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine stat="Good" counter={statsGood} />
          <StatisticLine stat="Neutral" counter={statsNeutral} />
          <StatisticLine stat="Bad" counter={statsBad} />

          <StatisticLine stat="All" counter={all}/>
          <StatisticLine stat="Average" counter={average}/>
          <StatisticLine stat="Positive" counter={positiveString}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("good before", good)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log("neutral before", neutral)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log("bad before", bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="Unicafe - Give Feedback" />

      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />

      <Header text="Feedback Statistics" />

      <Statistics statsGood={good} statsNeutral={neutral} statsBad={bad} />
    </div>
  )
}

export default App