import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap'
// import 'bootstrap/js/src/collapse'
// import 'bootstrap/js/src/dropdown'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Medecin from './Medecin';
import CreatMed from './CreatMed';
import EditMed from './EditMed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Medecin/>} ></Route>
        <Route path="/cree" element={<CreatMed/>} ></Route>
        <Route path="/ed/:Numed" element={<EditMed/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
