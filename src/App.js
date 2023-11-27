// import logo from './logo.svg';
import './App.css';
// import FeedbackApp from './components/Feedback';
// import PhonebookApp from './components/Phonebook';
import ReaderApp from './components/ReaderApp';
import publications from './constants/publications.json';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div>
        {/* <FeedbackApp /> */}
        {/* <PhonebookApp/> */}
        <ReaderApp items={publications} />
      </div>
    </div>
  );
}

export default App;
