import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { UserService } from '../../shared/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-only',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './admin-only.component.html',
  styles: []
})
export class AdminOnlyComponent implements OnInit {
  newUser = {
    id: '',
    fullName: '',
    email: '',
    username: '',
    password: '',
    role: ''
  };

  selectedUser: any = null;
  editMode = false;
  editIndex = -1;
  users: any;
  userbyid: any;
  id: any;
  orderList: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.users= res;
      // console.log(this.users)
    },
  )
  }
//   getorder(){
//   debugger
// this.userService.getOrders().subscribe(res=>{
// this.orderList=res;
// console.log(this.orderList)
// })
// }
getById(id: any) {
  this.userService.getById(id).subscribe(res => {
    this.userbyid = res;
    console.log(this.userbyid);
  });
}
deleteuser(id: string) {
  if (confirm("Are you sure you want to delete this user?")) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert("User deleted successfully.");
        this.getUsers(); // Refresh the list
      },
      error: (err) => {
        console.error("Delete failed", err);
        alert("Failed to delete user.");
      }
    });
  }
}

  addUser() {
    if (!this.newUser.fullName || !this.newUser.email || !this.newUser.username || !this.newUser.password || !this.newUser.role) {
      alert('Please fill all required fields!');
      return;
    }

    if (this.editMode) {
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe({
        next: () => {
          this.getUsers();
          this.resetForm();
          this.closeAddUserModal();
        },
        error: () => alert('Update failed!')
      });
    } else {
      this.userService.addUser(this.newUser).subscribe({
        next: () => {
          this.getUsers();
          this.resetForm();
          this.closeAddUserModal();
        },
        error: () => alert('Add failed!')
      });
    }
  }



  viewUser(user: any) {
    this.selectedUser = user;
    const modalElement = document.getElementById('viewUserModal');
    const modalInstance = new Modal(modalElement!);
    modalInstance.show();
  }

  editUser(user: any) {
    this.newUser = { ...user };
    this.editMode = true;
    this.editIndex = this.users.findIndex((u: { id: any; }) => u.id === user.id);

    const modalElement = document.getElementById('addUserModal');
    const modalInstance = new Modal(modalElement!);
    modalInstance.show();
  }

  resetForm() {
    this.newUser = {
      id: '',
      fullName: '',
      email: '',
      username: '',
      password: '',
      role: ''
    };
    this.editMode = false;
    this.editIndex = -1;
  }

  closeAddUserModal() {
    const modalElement = document.getElementById('addUserModal');
    const modalInstance = Modal.getInstance(modalElement!);
    modalInstance?.hide();
  }
}
