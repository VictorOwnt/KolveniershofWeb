import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import {WorkdayTemplateDataService} from '../../../services/workdayTemplate.data.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-template-new',
  templateUrl: './template-new.component.html',
  styleUrls: ['./template-new.component.scss']
})
export class TemplateNewComponent implements OnInit {
  templateForm: FormGroup;
  oldName: string = null;
  templateName: string = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<TemplateNewComponent>,
    private workdayTemplateDataService: WorkdayTemplateDataService,
    private fb: FormBuilder
  ) {
    if (data.templateName !== undefined) {
      this.oldName = data.templateName;
    }
    this.templateName = this.oldName;
  }

  ngOnInit() {
    this.templateForm = this.fb.group({
      templateName: [this.templateName, [Validators.required, this.uniqueNameValidator()]]
    });
  }

  uniqueNameValidator(): ValidatorFn { // TODO - validator
    return (control: AbstractControl) => {
      if (control.value) {
        /*this.workdayTemplateDataService.templateNames$.subscribe(names => {
          names.forEach(name => {
            if (name.toLowerCase().trim() === control.value.toString().toLowerCase().trim()) {
              return {unique: true};
            }
          });
        });*/
      } else {
        return null;
      }
    };
  }

  getTemplateNameErrorMessage() {
    if (this.templateForm.controls.templateName.hasError('required')) {
      return 'Naam is verplicht.';
    } else if (this.templateForm.controls.templateName.hasError('unique')) {
      return 'Naam moet uniek zijn.';
    } else {
      return '';
    }
  }

  save() {
    if (this.oldName) {
      this.workdayTemplateDataService.patchWorkdayTemplateName(this.oldName, this.templateForm.value.templateName).subscribe(value => {
        if (value) {
          // Success dialog
          this.dialogRef.close('Sjabloon aangepast');
        } else {
          // Error dialog
          this.dialogRef.close(false);
        }
      });
    } else {
      this.workdayTemplateDataService.postCreateWorkdayTemplatesWithName(this.templateForm.value.templateName).subscribe(value => {
        if (value) {
          // Success dialog
          this.dialogRef.close('Sjabloon toegevoegd');
        } else {
          // Error dialog
          this.dialogRef.close(false);
        }
      });
    }
  }

}
