import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    image: null
  });
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null); // Thêm trạng thái cho URL tạm thời

  const { name, username, email, phone, address, image } = user;

  const onInputChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setUser({ ...user, image: file });
      setPreview(URL.createObjectURL(file)); // Tạo URL tạm thời cho tệp ảnh
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', image);

    try {
      await axios.put(`http://localhost:8083/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8083/user/${id}`);
    setUser(result.data);
    if (result.data.image) {
      setPreview(`http://localhost:8083/${result.data.image}`); // Thiết lập URL xem trước từ dữ liệu tải về
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#ffffff', marginTop: 65, marginBottom: 200 }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">

              <h1 className="mb-4" style={{ fontWeight: 700, fontSize: 50, color: 'rgb(0, 64, 128)' }}>Update Student</h1>

              <div className="card" style={{ borderRadius: '15px', backgroundColor: '#EEEEEE' }}>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="row align-items-center pt-2 pb-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Name</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input type="text" name="name" className="form-control form-control-lg" value={name} onChange={onInputChange} required />
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="row align-items-center pt-2 pb-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Username</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input type="text" name="username" className="form-control form-control-lg" value={username} onChange={onInputChange} required />
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input type="email" name="email" className="form-control form-control-lg" value={email} onChange={onInputChange} placeholder="" required />
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input className="form-control form-control-lg" type="text" name="phone" value={phone} onChange={onInputChange} placeholder="" required />
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <textarea className="form-control form-control-lg" name="address" rows={3} type="text" value={address} onChange={onInputChange} placeholder="" required></textarea>
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="row align-items-center py-2">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Image</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input className="form-control form-control-lg" id="formFileLg" type="file" name="image" onChange={onInputChange} />
                        {preview && (
                          <img src={preview} alt="User" width="150" height="150" style={{ borderRadius: 0, marginTop: 25, float: 'left' }} />
                        )}
                      </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="d-flex px-5 py-4" style={{ marginLeft: 190, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                      <button
                        type="submit"
                        className="btn btn-update text-white"
                        data-mdb-ripple-init
                        style={{ backgroundColor: '#FFBF00', fontWeight: 600, textTransform: 'uppercase', width: 250 }}
                        role="button"
                      >
                        <i className="fa-solid fa-arrows-rotate me-2"></i>
                        Saving
                      </button>

                      <Link
                        to={"/"}
                        className="btn btn-cancel text-white"
                        data-mdb-ripple-init
                        style={{ backgroundColor: '#A91D3A', fontWeight: 600, textTransform: 'uppercase', marginRight: 195, width: 250 }}
                        role="button"
                        onClick={() => navigate("/")}
                      >
                        <i className="fa-solid fa-ban me-2"></i>
                        Cancel
                      </Link>
                    </div>

                  </form>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student update successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Student has been successfully update.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;