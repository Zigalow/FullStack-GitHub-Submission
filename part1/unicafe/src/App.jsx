import {useState} from "react";

const Header = ({header}) => <><h1>{header}</h1></>

const Button = ({handleClick, text}) => {
    return (
        < button
            onClick={handleClick}> {text}
        </button>
    )
}

const StatisticLine = ({category, value}) => {
// const category = category.toString()

    if (category.toLowerCase() === "positive") {
        return (
            <p>{category} {value} %</p>
        )
    }
    return (
        <div>
            <p>{category} {value}</p>
        </div>

    )

}

const Statistics = (props) => {
    const allValues = props.allValues
    if (allValues === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    const goodValue = props.goodValue
    const neutralValue = props.neutralValue
    const badValue = props.badValue

    const average = ((1 * goodValue) + (-1 * badValue)) / allValues
    const positive = goodValue / allValues * 100

    return (
        <>
            <StatisticLine category={"good"} value={goodValue}/>
            <StatisticLine category={"neutral"} value={neutralValue}/>
            <StatisticLine category={"bad"} value={badValue}/>
            <StatisticLine category={"all"} value={allValues}/>
            <StatisticLine category={"average"} value={average}/>
            <StatisticLine category={"positive"} value={positive}/>
        </>
    )
}

const App = () => {
    const [goodValue, setGoodValue] = useState(0)
    const [neutralValue, setNeutralValue] = useState(0)
    const [badValue, setBadValue] = useState(0)
    const [allValues, setAllValues] = useState(0)

    const handleGood = () => {
        setGoodValue(goodValue + 1)
        setAllValues(allValues + 1)
    }
    const handleNeutral = () => {
        setNeutralValue(neutralValue + 1)
        setAllValues(allValues + 1)
    }
    const handleBad = () => {
        setBadValue(badValue + 1)
        setAllValues(allValues + 1)
    }

    return (

        <div>
            <Header header={"give feedback"}/>

            <Button handleClick={handleGood} text={"good"}/>
            <Button handleClick={handleNeutral} text={"neutral"}/>
            <Button handleClick={handleBad} text={"bad"}/>

            <Header header={"statistics"}/>
            <Statistics goodValue={goodValue} badValue={badValue} neutralValue={neutralValue} allValues={allValues}/>
        </div>
    )
}

export default App;