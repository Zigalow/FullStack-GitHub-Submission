const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
};

const Part = (props) => {
    return (
        <p>{props.part} {props.numberOfExercises}</p>
    )
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.partzzz[0].name} numberOfExercises={props.partzzz[0].exercises} />
            <Part part={props.partzzz[1].name} numberOfExercises={props.partzzz[1].exercises} />
            <Part part={props.partzzz[2].name} numberOfExercises={props.partzzz[2].exercises} />
        </div>
    )
};

const Total = (props) => {
    return (
        <p>Number of exercises {props.first + props.second + props.third}</p>
    )
};

const App = () => {
    const course = "Half Stack application development"
    const part1 = "Fundamentals of React"
    const exercises1 = 10
    const part2 = "Using props to pass data"
    const exercises2 = 7
    const part3 = "State of a component"
    const exercises3 = 14
    const parts = [
        {name: part1, exercises: exercises1},
        {name: part2, exercises: exercises2},
        {name: part3, exercises: exercises3},

    ]

    return (
        <div>
            <Header course={course}/>
            <Content partzzz={parts} />
            <Total first={exercises1} second={exercises2} third={exercises3}/>
        </div>
    )
};

export default App
