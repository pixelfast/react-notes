import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

const jsonURL = 'http://192.168.0.114:8000';


function App() {
  return (
    <Router>
      <div className='container dark'>
        <div className='app'>
          <Header />
          <Routes>
            <Route exact path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 
