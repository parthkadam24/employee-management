import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then(res => setEmployees(res.data))
            .catch(err => console.error("Error loading employees:", err));
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            EmployeeService.deleteEmployee(id)
                .then(() => loadEmployees())
                .catch(err => alert("Delete failed: " + err.message));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Employee Management System</h2>
            <Link to="/add" className="btn btn-primary mb-3">+ Add Employee</Link>

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4">
                                No employees found. Click "+ Add Employee" to create one.
                            </td>
                        </tr>
                    ) : (
                        employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.salary}</td>
                                <td>
                                    <Link to={`/edit/${emp.id}`} className="btn btn-info btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(emp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;