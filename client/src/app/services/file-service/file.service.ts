import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private FILE_URL = 'http://localhost:8085/api/v1/file';
  
  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(this.FILE_URL + "/uploadImage/", formData,  {responseType: 'text'});
  }
}
