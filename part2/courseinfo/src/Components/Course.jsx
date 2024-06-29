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


    return (
        <div>
            <b>total of {numberOfExercise} exercises</b>
        </div>
    )
}


export default Course