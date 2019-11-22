import { Subject} from 'rxjs';
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
    public imageDownloadUrls: string[] = []; //get from firebase
    public iconDownloadUrls: string[] = []; //get from firebase

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage
    ) {}

    handleFile(event): File {
        this.fileData = (event.target.files[0] as File);
        const fileType = this.fileData.type;
        if (fileType.match(/image\/*/) == null && fileType.match('\.svg')) {
            console.log('no image or icon');
            return;
        } else {
            return this.fileData;
        }
    }

    get IconDownloadUrls$(): string[] {
        return null;
    }

    async uploadFile(filePath: string) {
        if (this.fileData) {
            this.filePath = filePath;
            const snap = await this.storage.upload(filePath, this.fileData);
            if (this.filePath.match(/^users/)) {
                this.getUrl(snap, 'user');
            } else if (this.filePath.match(/^icons/)) {
                this.getUrl(snap, 'icon');
            }
          } else {alert('Selecteer een foto/icoon'); }
    }

    private async getUrl(snap: firebase.storage.UploadTaskSnapshot, type: string) {
        const url = await snap.ref.getDownloadURL();
        if (type === 'user') {
            this.imageDownloadUrls.push(url);
            console.log('pushed image');
        } else {
            this.iconDownloadUrls.push(url);
            // let iconDownloadUrl: string[];
            // this.iconDownloadUrls.subscribe(downloadUrls => (iconDownloadUrl = downloadUrls));
            console.log('pushed icon');
            console.log(this.iconDownloadUrls[0]);
            // console.log(iconDownloadUrl[0]);
        }
      }
}