const Header = ({course}) => <h1>{course}</h1> ;

const Content = ({parts}) => parts.map((part, idx )=> <p key={idx}>{part.title} {part.exercises}</p>);

const Total = ({parts}) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {title: 'Fundamentals of React', exercises: 10},
    {title: 'Using props to pass data', exercises: 7},
    {title: 'State of a component', exercises: 14} 
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </div>
  )
}

export default App