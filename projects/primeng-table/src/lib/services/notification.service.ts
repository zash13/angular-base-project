/*
 * Copyright (c) 2025 Alex Ibrahim Ojea
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Injectable } from '@angular/core';

/**
 * Abstract service for handling notifications in **ECS Primeng table**.
 * 
 * Provides a consistent interface for displaying and clearing toast notifications.
 * Implementations must define how the notifications are managed.
 */
@Injectable({ providedIn: 'root' })
export abstract class ECSPrimengTableNotificationService {

  /**
   * Displays a toast notification.
   * 
   * @param severity The severity level of the notification (e.g., 'success', 'info', 'warn', 'error').
   * @param title The title of the toast message.
   * @param message The detailed message of the toast.
   */
  abstract showToast(
    severity: string,
    title: string,
    message: string
  ): void;
  
  /**
   * Clears all currently displayed toast notifications.
   */
  abstract clearToasts(): void;
}