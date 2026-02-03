import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = all === 0 ? 0 : (good - bad) / all
    const positive = all === 0 ? 0 : (good / all) * 100

    if (all === 0) {
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average.toFixed(1)} />
                    <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
                </tbody>
            </table>
        </div>
    )
}

const Unicafe = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <Button handleClick={() => setGood(good + 1)} text="good" />
                <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
                <Button handleClick={() => setBad(bad + 1)} text="bad" />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default Unicafe
