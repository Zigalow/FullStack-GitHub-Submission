import {useState} from "react";

const Header = ({header}) => <><h1>{header}</h1></>

const Button = ({handleClick, text}) => {
    return (
        < button
            onClick={handleClick}> {text}
        </button>
    )
}

const Statistics = (props) => {
    const all = props.all
    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    const average = ((1 * good) + (-1 * bad)) / all
    const positive = good / all * 100

    return (
        <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (

        <div>
            <Header header={"give feedback"}/>

            <Button handleClick={handleGood} text={"good"}/>
            <Button handleClick={handleNeutral} text={"neutral"}/>
            <Button handleClick={handleBad} text={"bad"}/>

            <Header header={"statistics"}/>
            <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
        </div>
    )
}

export default App;