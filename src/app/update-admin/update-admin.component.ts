import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  
  
  @Output() onAdminChange = new EventEmitter()
  adminDetails:any = {}

  editadminStatus:boolean = false
  profilePicture:string = 'https://png.pngtree.com/png-clipart/20220213/original/pngtree-avatar-bussinesman-man-profile-icon-vector-illustration-png-image_7268049.png'


  constructor(private adminAPI:AdminService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails = res
      if(res.profilePic){
        this.profilePicture = res.profilePic
      }
    })
  }
  
  editAdminBtn(){
    this.editadminStatus = true
  }
  onCancel(){
    this.editadminStatus = false
  }
  getFile(event:any){
    let file = event.target.files[0]
    let fr =new FileReader
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profilePicture = event.target.result
      this.adminDetails.profilePic = event.target.result

      
    }
  }
  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editadminStatus = false
        this.toaster.success("Admin details Updated Successfully!!")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        this.toaster.warning("Updation Failed... Please try After Sometimes")
      }
    })
  }
}
