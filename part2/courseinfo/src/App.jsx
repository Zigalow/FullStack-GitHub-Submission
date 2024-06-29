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
    console.log("Part:", part)
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

/*const Total = (props) => {
    return (
        <div>
            <p>Number of
                exercises {props.course.parts[0].exercise + props.course.parts[1].exercise + props.course.parts[2].exercise}</p>
        </div>
    )
}*/

const Course = ({course}) => {

    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
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
