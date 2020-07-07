import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ConnectingserviceService } from '../connectingservice.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})

export class LoginComponent implements OnInit {
  isLoginMode = true;
  public static userEmail: any;
  public static ssr: WindowSessionStorage;
  email: any;
  password: any;
  userArray: any;
  result: boolean = false;
  roles:any[]=['user','admin'];
  public static userRegId:any;
  i:any;
  user_role:any;  

  constructor(private ccs: ConnectingserviceService, private router: Router) {
    this.ccs.getUser().subscribe(res => {
      this.userArray = res['response'];
      console.log(res);
      console.log(this.userArray);
    });
    
  }

  //@ViewChild("data") loginForm: NgForm;
  validate() {
    for (var ua of this.userArray) {
      console.log("in validate " + ua.user_email + ' ' + ua.user_password);
      if ((ua.user_email === this.email && ua.user_password === this.password)) {
        sessionStorage.setItem("regId",ua.user_reg_id);
        //sessionStorage.setItem("userName",ua.user_name);

      //console.log("in validate user reg id is "+LoginComponent.userRegId);
          for(this.i=0;this.i<this.roles.length;this.i++)
          {
            if(ua.user_role==this.roles[this.i])
            {
              console.log("role found in validate "+ua.user_role)
              this.user_role=ua.user_role;
              sessionStorage.setItem("role",this.user_role)
            }
          }
        this.result = true;
        console.log("welcome " + this.result);
        sessionStorage.setItem("email", this.email);
        this.router.navigate(['/success']);
        break;
      }
      if ((ua.user_name != this.email && ua.password != this.password)) {
        this.result = false;
        this.router.navigate(['/fail']);
      }
    }
  }
  ngOnInit() {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
