const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <p>{props.part1} {props.exercise1}</p>
            <p>{props.part2} {props.exercise2}</p>
            <p>{props.part3} {props.exercise3}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.exercises}</p>
        </div>
    )
}

const App = () => {
    // Header
    const course = 'Half Stack application development'

    // Body
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    // Total

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1} exercise1={exercises1}
                     part2={part2} exercise2={exercises2}
                     part3={part3} exercise3={exercises3}/>
            <Total exercises={exercises1 + exercises2 + exercises3}/>
            {/*<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>*/}
        </div>
    )
}


export default App
