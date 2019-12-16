import {Component, Inject, OnInit} from '@angular/core';
import {Comment} from '../../models/workday.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private firebaseService: FirebaseService) {
    this.comments = data.comments;
  }

  ngOnInit() {
    this.comments.forEach(async comment => {
      await this.getImageUrl(comment.client);
    });
  }

  async getImageUrl(user: User) {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(user.picture, 'user').toPromise()
      .then(image => resolve(user.picture = image))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
  }

  mailto(comment: Comment): string {
    const mailContent = [];
    mailContent.push(
      'Beste ' + comment.client.firstName + ',',
      'Uw opmerking werd beantwoord.',
      'Uw opmerking:\n' + comment.comment,
      'Antwoord:\n' + 'HIER ANTWOORDEN',
      'Met vriendelijke groeten\n' + '\nHet Kolveniershof'
    );

    const recepient = encodeURI(comment.client.email);
    const copy = 'cc=' + encodeURI(''); // TODO - Cc
    const blindCopy = 'bcc=' + encodeURI(''); // TODO - Bcc
    const subject = 'subject=' + encodeURI('Kolveniershof: Antwoord op uw opmerking');
    const body = 'body=' + encodeURI(mailContent.join('\n\n'));
    return 'mailto:' + recepient + '?' + copy + '&' + blindCopy + '&' + subject + '&' + body;
  }

}
