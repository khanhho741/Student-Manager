import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css';


import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/addstudent' element={<AddUser></AddUser>}></Route>
        <Route exact path='/editstudent/:id' element={<EditUser></EditUser>}></Route>
        <Route exact path='/viewstudent/:id' element={<ViewUser></ViewUser>}></Route>

      </Routes>
      </Router>
    

      <footer className="text-center text-white" style={{ backgroundColor: '#f1f1f1' }}>
        <div className="container pt-4">
          <section className="mb-4">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div className="text-center text-white p-3" style={{ backgroundColor: '#004080' }}>
          © 2024 Copyright:
          <a className="text-white" href="#">khanhho741</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
