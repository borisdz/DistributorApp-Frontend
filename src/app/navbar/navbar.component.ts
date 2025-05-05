import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
