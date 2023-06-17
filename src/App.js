import logo from './logo.svg';
import './App.css';
import data from './json-data.json';
import Home from './components/Home';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <h1>Tests Data Table</h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
