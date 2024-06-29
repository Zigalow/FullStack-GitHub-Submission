const Courses = ({courses}) => {

    console.log(courses)

    return (
        <div>
            {courses.map(course => (
                <Course key={course.id} course={course}/>
            ))}
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

const App = () => {

    // Courses array
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]

        }
    ]

    return (
        <div>
            {/*  {courses.map(course => (
                <Course key={course.id} course={course}/>
            ))}*/}
            <Courses courses={courses}/>
        </div>
    )
}

export default App
//