import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../models/sidebar-models';

@Component({
  selector: 'lib-sidebar-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent {
  @Input() user?: UserProfile;
  @Input() collapsed = false;
}
