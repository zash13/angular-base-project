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

import { ITableQueryRequest } from './table-query-request.interface';

/**
 *
 * Represents the request parameters for exporting table data to Excel.
 * @remarks
 * Extends `ITableQueryRequest` to include Excel-specific options such as filename,
 * column selection, and whether to apply current filters and sorts.
 */
export interface IExcelExportRequest extends ITableQueryRequest {
  /** The desired name of the exported Excel file. */
  filename: string;

  /** Determines whether all columns should be included in the export. */
  allColumns: boolean;

  /** Determines whether the current table filters should be applied in the export. */
  applyFilters: boolean;

  /** Determines whether the current table sorting should be applied in the export. */
  applySorts: boolean;

  /** If in bools we need to use icons or the underlying boolean value. */
  useIconInBools: boolean;
}

