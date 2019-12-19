import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../services/user.data.service';
import {User} from '../../models/user.model';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-selector-modal',
  templateUrl: './user-selector-modal.component.html',
  styleUrls: ['./user-selector-modal.component.scss']
})
export class UserSelectorModalComponent implements OnInit {
  clients: User[];

  constructor(
    private userDataService: UserDataService,
    private firebaseService: FirebaseService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSelectorModalComponent>
  ) {
  }

  ngOnInit() {
    this.userDataService.clients$.subscribe(clients => {
      this.clients = clients;
      this.clients.forEach(async client => {
        await this.getImageUrl(client);
      });
    });
  }

  async getImageUrl(user: User) {
    return new Promise((resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(user.picture, 'user').toPromise()
        .then(image => resolve(user.picture = image))
        .catch((e) => reject(e));
    }).catch((err) => console.log(err));
  }

  openClientSchedule(client: User) {
    this.dialogRef.close();
    this.router.navigate([`/schedule/client/${client.id}`]);
  }

}
