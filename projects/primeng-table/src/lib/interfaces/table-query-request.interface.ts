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

/**
 * Represents a request for querying table data with pagination, sorting, and filtering.
 *
 * @remarks
 * Includes information about page, page size, sorting, filters, and date formatting options.
 */
export interface ITableQueryRequest {
    
    /** The current page number. */
    page: number;

    /** The number of items per page. */
    pageSize: number;

    /** Optional sorting configuration. */
    sort?: any;

    /** Filter criteria for the query. */
    filter: any;

    /** Optional global filter applied across all columns. */
    globalFilter?: string | null;

    /** Optional array of column names to include in the query. */
    columns?: string[];

    /** The date format used for query parameters. */
    dateFormat: string;

    /** The timezone used for formatting date values. */
    dateTimezone: string;

    /** The culture/locale used for formatting dates and numbers. */
    dateCulture: string;

    /** The date format used in exports. */
    exportDateFormat: string;
}