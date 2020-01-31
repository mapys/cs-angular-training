import { UserService } from './../../../shared/services/user.service';
import { UserFormComponent } from './../../components/user-form/user-form.component';
import { User } from './../../../shared/models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../states/user.state';
import { GetUsers, DeleteUser } from '../../actions/user.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @Select(UserState.getListOfUsers) getListOfUsers$: Observable<User[]>;
  selectedUser: User;
  listOfUsers: User[] = [];
  constructor(private userService: UserService, private store: Store, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
    this.store.dispatch(new GetUsers()).subscribe();
  }

  getUsers() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.listOfUsers = user;
    });
  }

  getSelectedUser(user: User) {
    this.selectedUser = user;
  //  this.userForm.form.patchValue(user);
  }

  deleteUser(user: User) {
    // this.userService.deleteUser(user.id).subscribe(() => {
    //   this.getUsers();
    // });

    this.store.dispatch(new DeleteUser(user.id)).subscribe(() => {
      this.getUsers();
      this.toastr.success("Delete User is Successful..");
    });
  }

  getFormValue(form: User){
    console.log(form);
  } 

}
