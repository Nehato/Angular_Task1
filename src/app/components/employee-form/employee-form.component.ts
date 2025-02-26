import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;

  departments = ['HR', 'Engineering', 'Sales', 'Marketing']; 

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]], 
      email: ['', [Validators.required, Validators.email]], 
      gender: ['', Validators.required], 
      department: ['', Validators.required], 
      joiningDate: ['', Validators.required], 
      salary: [50000, [Validators.required, Validators.min(10000), Validators.max(200000)]] 
    });
  }

  showToast(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center', 
      panelClass: ['snackbar-success'] 
    });
  }
  

  submitForm() {
    if (this.employeeForm.valid) {
      console.log('Form Submitted:', this.employeeForm.value);
      this.showToast('✅ Employee added successfully!', 'Close', 3000);
    } else {
      console.log('Form Invalid');
      this.showToast('⚠️ Please fill in all required fields!', 'Close', 3000);
    }
  }
  

  resetForm() {
    this.employeeForm.reset();
  }
}
