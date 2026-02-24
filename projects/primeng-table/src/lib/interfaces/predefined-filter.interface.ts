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
 * Represents a predefined filter value for a column in **ECS PrimeNG table**.
 * 
 * Allows displaying a value as text, tag, icon or image (from URL or blob) with optional styles and colors.
 */
export interface IPredefinedFilter {
    
    /**
     * The underlying value of the cell. Must match the data returned from the backend for proper filtering and mapping.
     * 
     * This is also used by the global filter internally.
     * 
     * **IMPORTANT**: For text and tag representations, it is recommended that `value` matches `name`.
     */
    value: string | number;

    /**
     * The text displayed in the frontend for this filter value.
     * 
     * Used when `displayName` is `true` or when displaying a tag.
     */
    name?: string;

    /**
     * Set to `true` to display the `name` as text in the cell.
     */
    displayName?: boolean;

    /**
     * Optional CSS style object to apply to the text when `displayName` is `true`.
     * 
     * Example: { color: 'blue', fontWeight: 'bold', fontStyle: 'italic' }
     */
    nameStyle?: { [key: string]: string };

    /**
     * Set to `true` to display the `name` as a tag in the cell.
     */
    displayTag?: boolean

    /**
     * Optional CSS style object to apply to the tag.
     * 
     * Example: { background: 'rgb(255,0,0)', color: 'white' }
     */
    tagStyle?: { [key: string]: string }

    /**
     * The icon to display for this value.
     * 
     * Can use icons from PrimeNG, Font Awesome, Material Icons, etc...
     */
    icon?: string;

    /**
     * Optional color to apply to the icon.
     * 
     * Example: "red", "#00ff00"
     */
    iconColor?: string;

    /**
     * Optional CSS style string to apply to the icon.
     * 
     * Example: "font-size: 1.5rem" "margin-right: 0.5rem"
     */
    iconStyle?: string;

    /** 
     * The image to display directly from a URL.
     */
    imageURL?: string;

    /** 
     * The image to display from a Blob object.
     */
    imageBlob?: Blob;

    /** 
     * If using a Blob and it is not provided directly, the backend endpoint to fetch the Blob from.
     */
    imageBlobSourceEndpoint?: string;

    /** 
     * @internal
     * Indicates that fetching the Blob from `imageBlobSourceEndpoint` failed.
     * 
     * **_Do not modify this property manually._**
     */
    imageBlobFetchError?: boolean;

    /**
     * Optional width of the image (and skeleton) in pixels.
     * 
     * If the value is <= 0 or undefined, the width will not be applied.
     */
    imageWidth?: number;

    /**
     * Optional height of the image (and skeleton) in pixels.
     * 
     * If the value is <= 0 or undefined, the height will not be applied.
     * If no value is specified, a default value of 22px will be used.
     */
    imageHeight?: number;

    /**
     * Optional. The action to execute when the predefined filter is clicked.
     * @param rowData The row data object of the clicked row.
     * @param option The IPredefinedFilter data of the predefined element clicked.
     */
    action?: (rowData: any, option: IPredefinedFilter) => void;
}