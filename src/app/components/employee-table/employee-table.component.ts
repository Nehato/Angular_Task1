import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SalaryFormatPipe } from '../../Pipes/custom-pipe.pipe';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  standalone: true, 
  imports: [CommonModule,MatButtonModule,MatFormFieldModule,MatIconModule,MatInputModule,MatSelectModule,MatTableModule,MatCardModule,SalaryFormatPipe]
})
export class EmployeeTableComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  
    
    displayedColumns: string[] = ['name', 'email', 'gender', 'department', 'dateOfJoining', 'salary', 'actions'];
  employeeSubscription: any;

  constructor(private http: HttpClient  ,private employeeService: EmployeeService) {}
  ngOnDestroy(): void {
    if(this.employeeSubscription){
      this.employeeSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeSubscription = this.employeeService.getEmployees().subscribe((data) => {
  
      this.employees = data;
      console.log(this.employees)
    },
    (error) => {
      console.error('Error loading employees:', error);
    }
  );
  }


  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(emp => emp.id !== id);
      });
    }
  }

  editEmployee(id: number) {
    console.log("Editing employee with ID: ", id);
  }
  
}
