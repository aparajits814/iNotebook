import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Temp from './Components/Temp';
import Addnote from './Components/Addnote';
import Sitelower from './Components/Sitelower';
function App() {
  return (
    <>
    <BrowserRouter>
    <div className='cont'>
        <Routes>
          
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
              <Route path='addnote' element={<Addnote />} />
              <Route path='' element={<Temp />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          
          
        </Routes>
        </div>
        <Sitelower></Sitelower>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem('auth-token')) {
    return props.children;
  } else {
    return <Navigate to='/login' />
  }

}
