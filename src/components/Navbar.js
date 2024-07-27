import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light  p-3" style={{ backgroundColor: '#004080' }}>
      <div className="container-fluid">
      <img className='me-1' src="/attachment_71057015.png" width={40} alt="logo" />
        <Link  to="/" className="navbar-brand" style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>Student App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto ">
            <li className="nav-item mx-2">
                <div class="input-group">
                    <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search"
                    style={{width: 450,}}
                    />
                    <button class="btn" type="submit" style={{backgroundColor: '#387ADF', color: '#fff',}}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div> 
            </li>
            
        </ul>
          <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
          <li className="nav-item mx-2">
                <Link 
                  className="btn btn-submit text-white"
                  data-mdb-ripple-init
                  style={{ backgroundColor: '#387ADF', fontWeight: 600 }}
                  to="/addstudent"
                  role="button"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>
                  Add Student   
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>

    </div>
  )
}

export default Navbar