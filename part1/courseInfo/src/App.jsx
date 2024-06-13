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
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    )

}

const Part = (props) => {
    return (
        <div>
            <p>{props.part.name} {props.part.exercise}</p>
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

    // Array of body
    const parts = [
        {
            name: part1,
            exercise: exercises1
        },
        {
            name: part2,
            exercise: exercises2
        },
        {
            name: part3,
            exercise: exercises3
        }
    ]

    // Total

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total exercises={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

export default App
