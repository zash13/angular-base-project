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

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Abstract service for handling HTTP requests for **ECS Primeng table**.
 *
 * Provides a consistent interface for making GET and POST requests to the backend.
 * Implementations must define how requests are executed, including error handling,
 * headers, and response processing.
 */
@Injectable({ providedIn: 'root' })
export abstract class ECSPrimengTableHttpService {
  /**
   * Performs a GET request to the specified service endpoint.
   *
   * @template T The expected response type.
   * @param servicePoint The endpoint URL or path for the GET request.
   * @param responseType Optional. The type of response expected, either `'json'` (default) or `'blob'`.
   * @returns An Observable of `HttpResponse<T>`, containing the full HTTP response.
   */
  abstract handleHttpGetRequest<T>(
    servicePoint: string,
    responseType?: 'json' | 'blob',
  ): Observable<T>;

  /**
   * Performs a POST request to the specified service endpoint.
   *
   * @template T The expected response type.
   * @param servicePoint The endpoint URL or path for the POST request.
   * @param data The payload to send in the POST request body.
   * @param httpOptions Optional HTTP headers to include in the request.
   * @param responseType Optional. The type of response expected, either `'json'` (default) or `'blob'`.
   * @returns An Observable of `HttpResponse<T>`, containing the full HTTP response.
   */
  abstract handleHttpPostRequest<T>(
    servicePoint: string,
    data: any,
    httpOptions?: HttpHeaders | null,
    responseType?: 'json' | 'blob',
  ): Observable<T>;
}
