import { Routes, Route } from 'react-router-dom';
import FeedbackApp from './components/Feedback';
import PhonebookApp from './components/Phonebook';
import initialContacts from "./constants/initialContacts.json";
import ReaderApp from './components/ReaderApp';
import publications from './constants/publications.json';
import PokemonApp from './components/PokemonApp';
import PlayerApp from './components/PlayerApp';
import ImagesApp from './components/Images/ImagesApp';
import ClockApp from './components/ClockApp';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="*" element={<>Not found</>} />
        <Route path="/feedback" element={<FeedbackApp />} />
        <Route path="/phonebook" element={<PhonebookApp initialContacts={initialContacts} />} />
        <Route path="/reader" element={<ReaderApp items={publications} />} />
        <Route path="/feedback" element={<FeedbackApp />} />
        <Route path="/pokemon" element={<PokemonApp />} />
        <Route path="/player" element={<PlayerApp />} />
        <Route path="/clock" element={<ClockApp />} />
        <Route path="/images" element={<ImagesApp />} />
      </Routes>
    </div>
  );
}

export default App;
