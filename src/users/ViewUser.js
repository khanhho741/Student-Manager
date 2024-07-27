
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUser = () => {

    const {id} = useParams()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        image: null
      });

      useEffect(() => {
        loadUser();
      }, []);

      const loadUser = async () => {
        const result = await axios.get(`http://localhost:8083/user/${id}`)
        setUser(result.data)
      }
      const BASE_URL = "http://localhost:8083/";
  return (
    <div>
        <section className="vh-100" style={{ backgroundColor: '#ffffff', marginTop: 20, marginBottom: 130 }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="mb-4" style={{ fontWeight: 700, fontSize: 50, color: 'rgb(0, 64, 128)' }}>Student Details</h1>
              <div className="card" style={{ borderRadius: '15px', backgroundColor: '#EEEEEE' }}>
                <div className="card-body">
                    <img className='mb-4' src={BASE_URL + user.image} alt="User" width="250" height="250"/>
                    <div>
                        <h2>Student Details - ID: {user.id}</h2>
                        <div className="user-details">
                            <div className="detail-item">
                            <h3>Name:</h3>
                            <p>{user.name}</p>
                            </div>
                            <div className="detail-item">
                            <h3>Username:</h3>
                            <p>{user.username}</p>
                            </div>
                            <div className="detail-item">
                            <h3>Email:</h3>
                            <p>{user.email}</p>
                            </div>
                            <div className="detail-item">
                            <h3>Phone:</h3>
                            <p>{user.phone}</p>
                            </div>
                            <div className="detail-item">
                            <h3>Address:</h3>
                            <p>{user.address}</p>
                            </div>
                        </div>
                        </div>
                </div>
                <Link
                    to={"/"}
                    className="btn btn-primary text-white mx-auto mb-5"
                    data-mdb-ripple-init
                    style={{fontWeight: 600, textTransform: 'uppercase', marginRight: 195, width: 250 }}
                    role="button"    
                    >
                    <i class="fa-solid fa-house me-2"></i>
                    Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewUser