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

import { IColumnMetadata } from "../interfaces";

/**
 * Represents the configuration settings for a table.
 *
 * @remarks
 * Contains column definitions, pagination options, date formatting, and other table-related settings.
 */
export interface ITableConfiguration {
    
    /** Array of metadata objects defining each column in the table. */
    columnsInfo: IColumnMetadata[];

    /** Allowed options for the number of items displayed per page. */
    allowedItemsPerPage: number[];

    /** The format used for displaying dates in the table. */
    dateFormat: string;

    /** The timezone applied when formatting date values. */
    dateTimezone: string;

    /** The culture/locale used for date and number formatting. */
    dateCulture: string;

    /** Maximum number of table views that can be saved or tracked. */
    maxViews: number;

    /** The format used for displaying dates in the exports. */
    exportDateFormat: string;

}