import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {}
}
