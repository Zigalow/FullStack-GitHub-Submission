import {useState} from "react";

const Header = ({header}) => <><h1>{header}</h1></>

const Button = ({handleClick, text}) => {
    return (
        < button
            onClick={handleClick}> {text}
        </button>
    )
}

const Statistics = ({good, neutral, bad}) => {

    return (
        <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
    }

    return (

        <div>
            <Header header={"give feedback"}/>

            <Button handleClick={handleGood} text={"good"}/>
            <Button handleClick={handleNeutral} text={"neutral"}/>
            <Button handleClick={handleBad} text={"bad"}/>

            <Header header={"statistics"}/>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App;