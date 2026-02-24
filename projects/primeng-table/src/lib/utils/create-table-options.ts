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
import { DEFAULT_TABLE_OPTIONS, ITableOptions } from '../interfaces';

/**
 * Deep merge two objects.
 * Recursively copies properties from `source` into `target`,
 * but ignores `undefined` values to preserve defaults.
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  for (const key in source) {
    const value = source[key];

    if (value === undefined) {
      // skip undefined values to keep defaults
      continue;
    }

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key]) (target as any)[key] = {};
      deepMerge((target as any)[key], value);
    } else {
      (target as any)[key] = value;
    }
  }
  return target;
}

/**
 * Create table options based on defaults, with optional overrides.
 */
export function createTableOptions(overrides: Partial<ITableOptions> = {}): ITableOptions {
  const defaultsCopy = JSON.parse(JSON.stringify(DEFAULT_TABLE_OPTIONS)); // clone only data
  const merged = deepMerge(defaultsCopy as any, overrides);

  // Reasign function if they exist in override
  if (overrides.rows?.style) merged.rows.style = overrides.rows.style;
  if (overrides.rows?.class) merged.rows.class = overrides.rows.class;

  return merged as ITableOptions;
}

