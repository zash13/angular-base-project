import { Observable } from 'rxjs';
import { MenuItem, SidebarNotification, SidebarMessage } from '../models/sidebar.models';

export interface SidebarDataSource {
  menus(): Observable<MenuItem[]>;
  notifications(): Observable<SidebarNotification[]>;
  messages(): Observable<SidebarMessage[]>;

  markNotificationAsRead(id: string): void;
  markMessageAsRead(id: string): void;
}
