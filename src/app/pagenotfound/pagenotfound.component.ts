import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private app: AppComponent) {
    app.uEmail = sessionStorage.getItem("email");
    app.isUserLoggedIn = true;
    app.role=sessionStorage.getItem("role");
    if(app.role== 'admin' && app.role!=null)
    app.isAdminRole=true;
    else if(app.role=='user' && app.role!=null)
    {
    app.isAdminRole=false;
    app.isUserRole=true; 
    }

    else{
      app.role=false;
      app.isAdminRole=false;
    }
  }

  ngOnInit(): void {
  }

}
