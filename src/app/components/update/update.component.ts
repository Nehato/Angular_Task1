import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class EmployeeUpdateComponent {
  updateForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: [this.data.name, Validators.required],
      email: [{ value: this.data.email, disabled: true }, [Validators.required, Validators.email]],
      department: [this.data.department, Validators.required],
      dateOfJoining: [this.data.dateOfJoining, Validators.required],
      salary: [this.data.salary, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedDetails = this.updateForm.getRawValue();
      this.http.put(`http://localhost:3000/employees/${this.data.id}`, updatedDetails).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close(updatedDetails);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
