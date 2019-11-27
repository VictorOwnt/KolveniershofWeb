import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../shared/models/workday.model';
import {AuthenticationService} from '../../../user/authentication.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[];

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {}

  mailto(comment: Comment): string {
    const mailContent = [];
    mailContent.push(
      'Beste ' + comment.client.firstName + ',',
      'Uw opmerking werd beantwoord.',
      'Uw opmerking:\n' + comment.comment,
      'Antwoord:\n' + 'HIER ANTWOORDEN',
      'Met vriendelijke groeten\n' + this.auth.currentUser.fullName + '\nHet Kolveniershof'
    );

    const recepient = encodeURI(comment.client.email);
    const copy = 'cc=' + encodeURI(''); // TODO - Cc
    const blindCopy = 'bcc=' + encodeURI(''); // TODO - Bcc
    const subject = 'subject=' + encodeURI('Kolveniershof: Antwoord op uw opmerking');
    const body = 'body=' + encodeURI(mailContent.join('\n\n'));
    return 'mailto:' + recepient + '?' + copy + '&' + blindCopy + '&' + subject + '&' + body;
  }

}
