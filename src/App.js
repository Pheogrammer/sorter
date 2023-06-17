import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <br />
        <h1>Tests Data Table</h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
