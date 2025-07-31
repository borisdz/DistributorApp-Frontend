import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Manager } from '../../models/manager.model';
import { ManagerService } from '../../services/manager.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-manager-profile',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css',
})
export class ManagerProfileComponent {
  profile!: Manager;
  form!: FormGroup;
  editMode = false;

  constructor(
    private svc: ManagerService,
    private fb: FormBuilder,
    private imageSvc: ImageService,
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.svc.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.buildForm(profile);
    });
  }

  // TODO: Update build form to match Manager's attributes
  private buildForm(p: Manager) {
    this.form = this.fb.group({
      firstName: [p.firstName, Validators.required],
      lastName: [p.lastName, Validators.required],
      email: [p.email, [Validators.required, Validators.email]],
      phone: [p.phone, Validators.required],
      city: [p.cityId, Validators.required],
    });
  }

  onSubmit() {
    this.svc.updateProfile(this.form.value).subscribe();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) this.buildForm(this.profile);
  }

  saveProfile() {
    if (this.form.invalid) return;
    this.svc.updateProfile(this.form.value).subscribe({
      next: () => {
        this.loadProfile();
        this.editMode = false;
      },
      error: (err) => alert('Save failed: ' + err.message),
    });
  }

  changeProfileImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file: File = input.files[0];
    this.imageSvc
      .uploadImage(file, 'MANAGER', this.profile.id)
      .then((obs) => {
        obs.subscribe({
          next: (res) => {
            this.profile.image = res.imgPath;
          },
          error: (err) => {
            console.error('Upload failed', err);
            alert('Failed to upload profile image.');
          },
        });
      })
      .catch((err) => {
        console.error('Upload failed', err);
        alert('Failed to upload profile image.');
      });
  }
}
