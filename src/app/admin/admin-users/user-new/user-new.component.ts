import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserNewComponent>,
    private fb: FormBuilder
  ) {
  }

  newUserForm: FormGroup;

  private static mailto(email: string): string {
    const mailContent = [];
    mailContent.push(
      'Beste,',
      'U werd uitgenodigd bij het Kolveniershof. Gelieve u te registreren met onderstaande link',
      'https://kolv02-hogent.web.app/r',
      'Met vriendelijke groeten\n' + '\nHet Kolveniershof'
    );

    const recepient = encodeURI(email);
    const copy = 'cc=' + encodeURI(''); // TODO - Cc
    const blindCopy = 'bcc=' + encodeURI(''); // TODO - Bcc
    const subject = 'subject=' + encodeURI('Kolveniershof: Registratie');
    const body = 'body=' + encodeURI(mailContent.join('\n\n'));
    return 'mailto:' + recepient + '?' + copy + '&' + blindCopy + '&' + subject + '&' + body;
  }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getEmailErrorMessage() {
    return this.newUserForm.controls.email.hasError('required') ? 'Emailadres is verplicht.' :
      this.newUserForm.controls.email.hasError('email') ? 'Geen geldig emailadres.' :
        '';
  }

  send() {
    // Should be backend -> mail server
    window.open(UserNewComponent.mailto(this.newUserForm.value.email));
    this.dialogRef.close('Email verzonden naar ' + this.newUserForm.value.email + '.');
  }

}
