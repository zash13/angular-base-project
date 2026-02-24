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

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ECSPrimengTableService } from '../ecs-primeng-table/ecs-primeng-table.service';
import { ITableButton } from '../../interfaces';

@Component({
  selector: 'ecs-table-button',
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ],
  standalone: true,
  templateUrl: './table-button.html',
  styleUrl: './table-button.scss'
})
export class TableButton {
  constructor(
    private tableService: ECSPrimengTableService
  ) {}
  @Input() button: any;
  @Input() rowData: any;
  @Input() isActionButton: boolean = false;
  @Input() isLastActionButton: boolean = false;
  @Input() overrideAction?: ((event: Event) => void);
  
  handleClick(event: Event) {
    if (this.button?.action || this.overrideAction) { // If there is an action or an override, execute logic
      if (this.overrideAction) { // If overrideAction exists, execute it first
        this.overrideAction(event); // Call override action
      } else { // Otherwise execute the normal button action through the service
        this.tableService.handleButtonsClick(this.button.action, this.rowData);
      }
    }
  }

  getButtonStyle(button: ITableButton, isActionButton: boolean, isLastActionButton: boolean) {
    const styles: any = {};
    if (button.style) { // Add inline styles from button.style
        button.style.split(';').forEach(part => {  /* Parse inline CSS: "padding: 4px; color:red" */
            const [prop, value] = part.split(':').map(x => x.trim());
            if (prop && value) styles[prop] = value;
        });
    }
    if (isActionButton && !isLastActionButton) { // Add margin-right for action buttons
        styles['margin-right'] = '10px';
    }
    return styles;
  }
}