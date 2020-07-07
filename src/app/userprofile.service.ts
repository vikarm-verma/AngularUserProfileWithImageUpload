import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {


  uri = "http://localhost:3000/api/users/profile";
  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get<any>(`${this.uri}`);
  }

  getUserProfileById(user_profile_id) {
    return this.http.get<any>(`${this.uri}/${user_profile_id}`);
  }

  addUserProfile(user_reg_id,user_name,user_email,user_mobile, user_gender,user_image) {
    const add_user_profile = {
      user_reg_id: user_reg_id,
      user_name: user_name,
      user_email: user_email,
      user_mobile:user_mobile,
      user_gender:user_gender,
      user_image:user_image
    };
    console.log("in userprofile service add user method");
    return this.http.post(`${this.uri}`,add_user_profile);
  }

  updateUserProfile(user_profile_id,user_name,user_email,user_mobile, user_gender,user_image) {
    const update_user_profile = {
      user_profile_id:user_profile_id,
      user_name: user_name,
      user_email: user_email,
      user_mobile:user_mobile,
      user_gender:user_gender,
      user_image:user_image
    };
    return this.http.put(`${this.uri}/${user_profile_id}`,update_user_profile);
  }

  deleteUserProfile(user_profile_id:number) {
    return this.http.delete(`${this.uri}/${user_profile_id}`);
  }
}
