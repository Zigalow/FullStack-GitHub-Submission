const Header = ({title}) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Total = ({parts}) => {

    const numberOfExercise =
        parts.reduce((accumulator, part) => {
                return (accumulator += part.exercises)
            }, 0
        )

    console.log(numberOfExercise)

    return (
        <div>
            <b>total of {numberOfExercise} exercises</b>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const App = () => {

    // Course object
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }, {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Course course={course}/>
        </div>
    )
}

export default App
