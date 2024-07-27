import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables'; // Import DataTables JS
import 'datatables.net-buttons-dt/js/buttons.dataTables';
import 'datatables.net-buttons/js/buttons.html5'; // HTML5 export buttons
import 'datatables.net-buttons/js/buttons.print'; // Print button
import 'datatables.net-buttons/js/buttons.colVis'; // Column visibility button
import 'datatables.net-buttons-dt/css/buttons.dataTables.css'; // DataTables Buttons CSS
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const {id} = useParams()

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
      // Destroy existing DataTable instance if it exists
      if ($.fn.DataTable.isDataTable('#example')) {
          $('#example').DataTable().destroy();
      }
      
      const result = await axios.get("http://localhost:8083/users");
      setUsers(result.data);
  };

    const deleteUser = async (id) => {
        setDeleteUserId(id);
        setShowModal(true);
    };

    const confirmDeleteUser = async () => {
        if (deleteUserId) {
            await axios.delete(`http://localhost:8083/user/${deleteUserId}`);
            loadUsers();
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
      if (users.length > 0) {
          // Destroy existing DataTable instance if it exists
          if ($.fn.DataTable.isDataTable('#example')) {
              $('#example').DataTable().destroy();
          }
          $('#example').DataTable({
              layout: {
                  top5Start: {
                      buttons: [
                          { extend: 'copy', text: '<i class="fa fa-files-o"></i>', titleAttr: 'Copy' },
                          { extend: 'excel', text: '<i class="fa fa-file-excel-o"></i>', titleAttr: 'Excel' },
                          { extend: 'csv', text: '<i class="fa fa-file-text-o"></i>', titleAttr: 'CSV' },
                          { extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i>', titleAttr: 'PDF' }
                      ]
                  }
              }
          });
      }
  }, [users]);

    const BASE_URL = "http://localhost:8083/";

    return (
        <div className='container' style={{ marginTop: 50, marginBottom: 400 }}>
            <h1 style={{ marginBottom: 50, color: '#333A73', fontWeight: 700 }}>Student Management</h1>
            <table id="example" className="display" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th className='custom-action-column'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td><img src={BASE_URL + user.image} alt="User" width="40" height="40" style={{borderRadius: 50}}/></td>
                            <td>
                                <Link className="btn btn-action btn-success me-2 ms-5" to={`/viewstudent/${user.id}`}>View <i className="fa-solid fa-eye"></i></Link>
                                <Link className="btn btn-action btn-warning me-2" to={`/editstudent/${user.id}`}>Edit <i className="fa-solid fa-arrows-rotate"></i></Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-action btn-danger me-2">Delete <i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;