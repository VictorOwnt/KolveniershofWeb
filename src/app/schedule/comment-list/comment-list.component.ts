import {Component, Inject, Input, OnInit} from '@angular/core';
import {Comment, Workday} from '../../models/workday.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public comments: Comment[],
      public dialogRef: MatDialogRef<CommentListComponent>, private auth: AuthenticationService) {
    console.log(this.comments);
  }

  ngOnInit() {
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
