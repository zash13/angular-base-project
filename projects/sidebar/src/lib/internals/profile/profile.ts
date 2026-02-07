import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserProfile } from '../../models/sidebar-models';

@Component({
  selector: 'lib-sidebar-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent {
  @Input() config: any = {};
  @Input() user: UserProfile = {
    name: 'John Doe',
    role: 'Administrator',
    status: 'online',
    avatar: 'assets/images/avatar.png',
    email: 'john.doe@example.com',
  };
}
