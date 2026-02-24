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

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CellOverflowBehaviour, DataAlignHorizontal, DataAlignVertical } from '../../enums';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { IColumnMetadata } from '../../interfaces';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'ecs-column-selector',
  imports: [
    DialogModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    SelectButtonModule,
    CommonModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    TooltipModule,
  ],
  standalone: true,
  templateUrl: './column-selector.html',
})
export class ColumnSelector {
  @ViewChild('dt_columnDialog') dt_columnDialog!: Table;

  @Input() visible: boolean = false;
  @Input() columnModalData: any[] = [];
  @Input() filteredColumnData: any[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() applyChanges = new EventEmitter<IColumnMetadata[]>();

  cellOverflowBehaviourOptions = [
    { icon: 'pi pi-minus', val: CellOverflowBehaviour.Hidden, name: 'Hidden' },
    { icon: 'pi pi-equals', val: CellOverflowBehaviour.Wrap, name: 'Wrap' } /*,
    {icon: 'pi pi-ellipsis-h', val: CellOverflowBehaviour.Ellipsis, name: "Ellipsis"}*/,
  ];
  dataAlignHorizontalOptions = [
    { icon: 'pi pi-align-left', val: DataAlignHorizontal.Left, name: 'Left' },
    { icon: 'pi pi-align-center', val: DataAlignHorizontal.Center, name: 'Center' },
    { icon: 'pi pi-align-right', val: DataAlignHorizontal.Right, name: 'Right' },
  ];
  dataAlignVerticalOptions = [
    { icon: 'pi pi-angle-up', val: DataAlignVertical.Top, name: 'Top' },
    { icon: 'pi pi-align-justify', val: DataAlignVertical.Middle, name: 'Middle' },
    { icon: 'pi pi-angle-down', val: DataAlignVertical.Bottom, name: 'Bottom' },
  ];

  globalSearchText: string | null = null; // The text used by the global search
  globalSearchMaxLength: number = 50;
  onColumnModalFilter(event: any) {
    const filterValue =
      event.filters && event.filters.global ? event.filters.global.value.toLowerCase() : '';
    this.filteredColumnData = this.columnModalData.filter((column) =>
      column.header.toLowerCase().includes(filterValue),
    );
  }

  allColumnsCheckboxActive(): boolean {
    return this.columnModalData.every((column) => column.selected);
  }

  allColumnsCheckboxClick(event: any): void {
    if (event.checked) {
      this.columnModalData.forEach((column) => {
        column.selected = true;
      });
    } else {
      this.columnModalData.forEach((column) => {
        if (!column.selectDisabled) {
          column.selected = false;
        }
      });
    }
  }

  filterColumnModal(event: any) {
    let filterValue = event.target.value;
    this.dt_columnDialog.filterGlobal(filterValue, 'contains');
  }

  applyColumnModalChanges() {
    const selected = this.columnModalData.filter((c) => c.selected && !c.selectDisabled);
    this.applyChanges.emit(selected);
    this.closeModal();
  }
  clearGlobalFilter(dt: Table) {
    this.globalSearchText = null;
    dt.filterGlobal('', '');
  }
  closeModal() {
    this.globalSearchText = null;
    this.visibleChange.emit(false);
  }
}
