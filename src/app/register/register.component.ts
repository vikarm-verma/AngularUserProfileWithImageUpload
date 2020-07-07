import { Component, OnInit } from '@angular/core';
import { ConnectingserviceService } from '../connectingservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  allUsers: any = [];
  data: any;
  user_email: any;
  password: any;
  repassword: any;
  formdata: any;
  userArray:any;
  userRole="user";
  isUserEmailValid:boolean=true;
  isBothPassValid:boolean=true;


  constructor(private ccs: ConnectingserviceService, private router: Router) {  
    console.log("in register component.ts");
    this.ccs.getUser().subscribe(res => {
    this.userArray = res['response'];
  }); }

  ngOnInit() {
    console.log("ngoninit working");  
  }
  
  addUser() {
    for(var ua of this.userArray)
    {
      console.log(this.user_email+ ' == '+ua.user_email);
      if(this.user_email==ua.user_email && ua.user_email!='')
      {
        console.log("user is already registered");
        this.isUserEmailValid=false;
        return;
      }
      else{
        this.isUserEmailValid=true;
      }
    }
  
    if (this.password === this.repassword) {
      this.ccs.addUser(this.user_email, this.password, this.repassword,this.userRole='user').subscribe((data) => console.log(data));
      console.log("data added in table");
      this.router.navigate(['/login']);
    }
    else {
      this.isBothPassValid=false;
      console.log("password does not match");
    }
  }

  onClickSubmit() {
    console.log(this.user_email, this.password, this.repassword);
  }
  cancel()
  {
    this.user_email="";
    this.password="";
    this.repassword="";
    this.userRole="";
    this.isUserEmailValid=true;
    this.isBothPassValid=true;
  }
}
