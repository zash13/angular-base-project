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

/*
 * Public API Surface of ecs-primeng-table
 */
// ENUMS
export * from './lib/enums';

// INTERFACES
export * from './lib/interfaces/columns-metadata.interface';
export * from './lib/interfaces/predefined-filter.interface';
export * from './lib/interfaces/table-button.interface';
export * from './lib/interfaces/table-options.interface';

// UTILS
export * from "./lib/utils/create-table-options";

// SERVICES
export * from './lib/services';

// COMPONENTS AND DEPENDENCIES
export * from './lib/components/ecs-primeng-table/ecs-primeng-table';
export * from './lib/components/ecs-primeng-table/ecs-primeng-table.service';