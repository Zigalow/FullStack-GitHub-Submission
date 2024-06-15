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
    const exercises1 = 10
    const exercises2 = 7
    const exercises3 = 14

    // Array of body
    const parts = [
        {
            name: 'Fundamentals of React',
            exercise: 10
        },
        {
            name: 'Using props to pass data',
            exercise: 7
        },
        {
            name: 'State of a component',
            exercise: 14
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
