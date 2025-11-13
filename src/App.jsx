import './App.css'
import amongUS from './assets/amongUS.png'

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the Crewmate Creator!</h1>
      <h3>Here is where you can create your very own set of crewmates before sending them off into space!</h3>
      <img src={amongUS} alt="Among Us" className="amongus" />
    </div>
  )
}

export default App
