import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserprofileService } from 'src/app/userprofile.service';
import { ConnectingserviceService } from 'src/app/connectingservice.service';
import { LoginComponent } from 'src/app/login/login.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  imageSrc: string;
  imageUrl;
  userProfileArray: any;
  userArray: any = [];
  regId;
  userProfileId;
  isUpdate: boolean = false;

  profileForm = new FormGroup({
    userRegId: new FormControl(sessionStorage.getItem("regId")),
    userProfileId: new FormControl(''),
    userName: new FormControl(sessionStorage.getItem("userName")),
    userEmail: new FormControl(sessionStorage.getItem("email")),
    userMobile: new FormControl(''),
    userGender: new FormControl(''),
    userImage: new FormControl(''),
  });

  constructor(private ups: UserprofileService, private ccs: ConnectingserviceService, private sanitizer: DomSanitizer) {
      this.ccs.getUser().subscribe(res => {
      this.userArray = res['response'];
      
      });
      this.ups.getUserProfile().subscribe(res => {
      this.userProfileArray = res['response'];
      console.log(this.userProfileArray);
      });
  }

  addUserProfile() {
      this.ups.addUserProfile(this.profileForm.controls.userRegId.value,
      this.profileForm.controls.userName.value,
      this.profileForm.controls.userEmail.value,
      this.profileForm.controls.userMobile.value,
      this.profileForm.controls.userGender.value,
      this.profileForm.controls.userImage.value).subscribe((data) => console.log(data));;
      console.log("data added" + this.profileForm.value);
  }

  ngOnInit(): void {
  }

  get f() {
    return this.profileForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.profileForm.patchValue({
        fileSource: reader.result
        });
      };
    }
  } 
  updateUserProfile() {
// //     console.log(this.userProfileArray);
// for (let userProfile of this.userProfileArray) {
//   let objectUrl = 'data:user_image/jpeg;base64,' + userProfile.user_image;
//   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl)
//   console.log(this.imageUrl);//    
// }
    this.isUpdate = !this.isUpdate;
    for(let userProfile of this.userProfileArray){
      this.profileForm.controls.userProfileId.setValue(userProfile.user_profile_id);
      this.profileForm.controls.userName.setValue(userProfile.user_name);
      this.profileForm.controls.userEmail.setValue(userProfile.user_email);
      this.profileForm.controls.userMobile.setValue(userProfile.user_mobile);
      this.profileForm.controls.userGender.setValue(userProfile.user_gender);
      this.profileForm.controls.userImage.setValue(userProfile.user_image);
      console.log(userProfile.user_image);
    }

 
  }
  update()
  {
    this.ups.updateUserProfile(this.profileForm.controls.userProfileId.value,this.profileForm.controls.userName.value,
      this.profileForm.controls.userEmail.value,this.profileForm.controls.userMobile.value,this.profileForm.controls.userGender.value,
      this.profileForm.controls.userImage.value).subscribe((data)=>console.log(data));
  }

  submit() {
    console.log(this.profileForm.value);
  }
}
