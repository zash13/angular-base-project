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

import { DataType } from "../enums";

/**
 * Converts a `DataType` enum value to its corresponding string representation.
 *
 * @param dataType - The data type enum value.
 * @returns The string representation of the data type ('text', 'numeric', 'boolean', or 'date').
 *
 * @remarks
 * If an unknown value is provided, the function defaults to 'text'.
 */
export function dataTypeAsText(dataType: DataType): string {
    switch (dataType) {
        case DataType.Text:
            return 'text';
        case DataType.Numeric:
            return 'numeric';
        case DataType.Boolean:
            return 'boolean';
        case DataType.Date:
            return 'date';
        default:
            return 'text';
    }
}