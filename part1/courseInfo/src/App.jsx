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
            <Part part={props.partzzz[0].name} numberOfExercises={props.partzzz[0].exercises}/>
            <Part part={props.partzzz[1].name} numberOfExercises={props.partzzz[1].exercises}/>
            <Part part={props.partzzz[2].name} numberOfExercises={props.partzzz[2].exercises}/>
        </div>
    )
};

const Total = (props) => {
    return (
        <p>Number of
            exercises {props.partszzz[0].exercises + props.partszzz[1].exercises + props.partszzz[2].exercises}</p>
    )
};

const App = () => {
        const course = {
            name: "Half Stack application development",
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10
                },
                {
                    name: "Using props to pass data",
                    exercises: 7
                },
                {
                    name: "State of a component",
                    exercises: 14
                },
            ]
        }
        return (
            <div>
                <Header course={course.name}/>
                <Content partzzz={course.parts}/>
                <Total partszzz={course.parts}/>
            </div>
        )
    }
;

export default App
