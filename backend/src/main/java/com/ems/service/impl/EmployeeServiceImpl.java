package com.ems.service.impl;

import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    @Override
    public Employee createEmployee(Employee employee) {
        if (repository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists: " + employee.getEmail());
        }
        return repository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee emp) {
        Employee existing = getEmployeeById(id);
        existing.setFirstName(emp.getFirstName());
        existing.setLastName(emp.getLastName());
        existing.setEmail(emp.getEmail());
        existing.setDepartment(emp.getDepartment());
        existing.setDesignation(emp.getDesignation());
        existing.setSalary(emp.getSalary());
        existing.setPhoneNumber(emp.getPhoneNumber());
        return repository.save(existing);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.delete(getEmployeeById(id));
    }
}