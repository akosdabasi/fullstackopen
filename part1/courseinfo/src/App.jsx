const Header = ({course}) => <h1>{course}</h1> ;

const Part = ({part, idx}) => <p key={idx}>{part.name} {part.exercises}</p>

const Content = ({parts}) => parts.map((part, idx) => <Part part={part} key={idx} idx={idx}/>);

const Total = ({parts}) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

const App = () => {
  const course = {

    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14} 
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App