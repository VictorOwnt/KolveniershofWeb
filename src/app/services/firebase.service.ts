import { Subject, Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
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

    lookupFileDownloadUrl(ref: string, type: string): Observable<string | null> {
        if (type === 'user' && ref === '') {
            return of('../../../assets/img/profile_picture_empty.png');
        } else if (type === 'icon' && ref === '') {
            return of('../../../assets/img/icons/icon-angry.svg');
        } else {
            return this.storage.ref(ref).getDownloadURL();
        }
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
