const Header = ({course}) => <h1>{course}</h1> ;

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => parts.map((part) => <Part part={part} key={part.id}/>);

const Total = ({parts}) => <p>Total of <b>{parts.reduce((acc, curr)=>acc + curr.exercises, 0)}</b> exercises </p>






const Course = ({course}) => {

    return (
        <div>
          <Header course = {course.name}/>
          <Content parts = {course.parts}/>
          <Total parts = {course.parts}/>
        </div>
      )
}
        

export default Course