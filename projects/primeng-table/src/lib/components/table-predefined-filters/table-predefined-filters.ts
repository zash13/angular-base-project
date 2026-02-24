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

import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ECSPrimengTableService } from '../ecs-primeng-table/ecs-primeng-table.service';
import { highlightText } from '../../utils';
import { IColumnMetadata } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ecs-table-predefined-filters',
  imports: [
    SkeletonModule,
    TagModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './table-predefined-filters.html'
})
export class TablePredefinedFilters {
  constructor(
    private sanitizer: DomSanitizer,
    private tableService: ECSPrimengTableService
  ) {}
  @Input() option: any;
  @Input() col: any;
  @Input() selectable: boolean = false;
  @Input() rowData: any;
  @Input() globalSearchText?: any;
  /**
   * Converts a blob from the database to a safe URL that can be used to display an image.
   *
   * This function takes a `Blob` object, converts it to a base64 encoded string, and returns a `SafeUrl` 
   * that can be used in an HTML template to display the image securely. The `SafeUrl` ensures that 
   * Angular's security mechanisms are bypassed correctly, preventing potential security risks.
   *
   * @param {Blob} blob - The blob object representing the image data from the database.
   * @returns {SafeUrl} A safe URL that can be used to display the image in an HTML template.
   * 
   * @example
   * // Example usage in a component
   * const imageBlob = new Blob([binaryData], { type: 'image/jpeg' });
   * const imageUrl = this.getBlobIconAsUrl(imageBlob);
   * 
   * // In your HTML template
   * <img [src]="imageUrl" alt="Image">
   */
  getBlobIconAsUrl(blob: Blob): SafeUrl {
    let objectURL = `data:image/jpeg;base64,${blob}`; // Create a base64 encoded string from the blob data
    return this.sanitizer.bypassSecurityTrustUrl(objectURL); // Bypass Angular's security mechanisms to create a SafeUrl
  }

  handleClick() {
    if (this.option.action) {
      this.tableService.handlePredefinedFilterClick(this.option.action, this.rowData, this.option);
    }
  }

  getTagStyle(option: any) {
    return {
      ...option.tagStyle,
      'vertical-align': 'middle',
      'gap': 0
    };
  }

  getImageSkeletonStyle(width?: number, height?: number, isSkeleton: boolean = false): Record<string, string> {
    const finalHeight = height && height > 0 ? `${height}px` : '22px'; // Compute final height; use default if invalid
    let finalWidth: string | undefined;
    if (width && width > 0) { // If width is valid, use it
      finalWidth = `${width}px`;
    } else if (isSkeleton) { // If it's a skeleton and width is not provided, mirror the height
      finalWidth = finalHeight;
    }
    const style: Record<string, string> = {
      'vertical-align': 'middle',
      'height': finalHeight
    };
    if (finalWidth) { // Add width if available
      style['width'] = finalWidth;
    }
    return style;
  }

  highlightText(cellValue: any, colMetadata: IColumnMetadata, globalSearchText: string | null | undefined ): SafeHtml {
      return highlightText(cellValue, colMetadata, globalSearchText ?? null, this.sanitizer);
  }
}