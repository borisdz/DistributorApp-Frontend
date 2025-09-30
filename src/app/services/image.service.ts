import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageStoreResponse } from '../models/image-store-response.model';
import { environment } from '../../environment';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImageUrl(entityType: string, entityId: number) {
    return `${environment.apiUrl}/${entityType}/${entityId}`;
  }

  async uploadImage(
    file: File,
    entType: string,
    entId: number,
  ): Promise<Observable<ImageStoreResponse>> {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    const formData = new FormData();
    formData.append('file', compressedFile);

    const url = `${environment.apiUrl}/image/upload?entType=${entType}&entId=${entId}`;

    return this.http.post<ImageStoreResponse>(url, formData);
  }

  async uploadImageWithProgress(
    file: File,
    entType: string,
    entId: number,
  ): Promise<Observable<HttpEvent<any>>> {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    const formData = new FormData();
    formData.append('file', compressedFile);
    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/image/upload?entType=${entType}&entId=${entId}`,
      formData,
      { reportProgress: true },
    );
    return this.http.request(req);
  }
}
