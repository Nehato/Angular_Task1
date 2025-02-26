import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
  standalone: true,
})
export class NavbarComponent {
  constructor(private router: Router) {} 

  onClick(){
    this.router.navigate(['/emp_form'])

  }                         

}
