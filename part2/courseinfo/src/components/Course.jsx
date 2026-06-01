const Header = ({ header }) => <h1>{header}</h1>

const CourseHeader = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map((part) => (
            <Part key={part.id} part={part}/>
        ))}
    </div>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => {
        console.log('what is happening:', sum, part)
        return sum + part.exercises
    }, 0)
    
    return (
        <div><b>Total: {totalExercises} exercises</b></div>
    )
}

const Course = ({ courses }) => {
    return (
    <div>
        <Header header="Web development curriculum" />
        
        {courses.map((course) => (
            <div key={course.id}>
                <CourseHeader name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts}/>
            </div>
        ))}

    </div>
    )
}

export default Course