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

import { SortMeta } from "primeng/api";
import { IColumnMetadata } from "./columns-metadata.interface";

/**
 * Represents the current state and configuration of a table view.
 *
 * @remarks
 * Includes information about displayed columns, widths, sorting, filtering, and pagination.
 */
export interface ITableViewData {
    
    /** Array of columns currently visible in the table. */
    columnsShown: IColumnMetadata[];

    /** The total width of the table in pixels. */
    tableWidth: any;

    /** Widths of individual columns as a formatted string (in pixels). */
    columnsWidth: string;

    /** Sorting metadata for multiple columns, if applicable. */
    multiSortMeta: SortMeta[] | null | undefined;

    /** Current filter settings applied to the table. */
    filters: any;

    /** Text used for global search across all columns, if any. */
    globalSearchText: string | null;

    /** The current page number. */
    currentPage: number;

    /** The number of rows displayed per page. */
    currentRowsPerPage: number;
}
