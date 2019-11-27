import { Subject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL} from '../../environments/environment';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
  })
export class FirebaseService {
    public loadingError$ = new Subject<string>();
    fileData: File = null;
    filePath: string = null;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage
    ) {}

    handleFile(event): File {
        this.fileData = (event.target.files[0] as File);
        const fileType = this.fileData.type;
        if (fileType.match(/image\/*/) == null && fileType.match('\.svg') == null) {
            console.log('no image or icon');
            return;
        } else {
            return this.fileData;
        }
    }

    lookupFileDownloadUrl(ref: string): Observable<string | null> {
        this.ref = this.storage.ref(ref);
        return this.ref.getDownloadURL();
    }

    uploadFile(filePath: string) {
        if (this.fileData) {
            this.filePath = filePath;
            this.ref = this.storage.ref(filePath);
            this.task = this.storage.upload(filePath, this.fileData);
        } else {
            alert('Selecteer een foto/icoon');
        }
    }
}
