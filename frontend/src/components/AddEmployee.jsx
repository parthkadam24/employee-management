import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        designation: '',
        salary: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeService.createEmployee(employee)
            .then(() => navigate('/'))
            .catch(err => alert("Error: " + (err.response?.data?.error || err.message)));
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h2 className="text-center mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                {[
                    { name: 'firstName', label: 'First Name', type: 'text' },
                    { name: 'lastName', label: 'Last Name', type: 'text' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'department', label: 'Department', type: 'text' },
                    { name: 'designation', label: 'Designation', type: 'text' },
                    { name: 'salary', label: 'Salary', type: 'number' },
                    { name: 'phoneNumber', label: 'Phone Number', type: 'text' }
                ].map(field => (
                    <div className="mb-3" key={field.name}>
                        <label className="form-label">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={employee[field.name]}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary"
                            onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;