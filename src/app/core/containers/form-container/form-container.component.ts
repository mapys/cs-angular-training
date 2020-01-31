import { UserFormComponent } from './../../components/user-form/user-form.component';
import { User } from './../../../shared/models/User';
import { UserService } from './../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store, Select } from '@ngxs/store';
import { CreateUser, UpdateUser, SetSelectedUser } from '../../actions/user.actions';
import { UserStateModel, UserState } from '../../states/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.sass']
})
export class FormContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('userForm') userForm: UserFormComponent;
  @Select(UserState.getSelectedUser) getSelectedUser$: Observable<User>;  
  title = '';
  action = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService,
              private changeRef: ChangeDetectorRef,
              private store: Store
              ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem('selectedUser');
  }

  ngAfterViewInit() {
    if (this.route.snapshot.params.id) {
      // this.userService.getUser(this.route.snapshot.params.id).subscribe((data) => {
      //   this.userForm.patchFormValue(data);
      // });
      if(JSON.parse(localStorage.getItem('selectedUser'))) {
        this.store.dispatch(new SetSelectedUser(JSON.parse(localStorage.getItem('selectedUser'))))
      }
        this.getSelectedUser$.subscribe((data) => {
          localStorage.setItem('selectedUser', JSON.stringify(data))
          this.userForm.patchFormValue(data);
        });
    
  
      this.action = 'update';
    } else {
      this.userForm.clear();
      this.action = 'create';
  }

    this.getTitle();
    this.changeRef.detectChanges();
}

  getTitle() {
    if (this.action === 'update') {
      this.title = 'Update User';
    } else {
     this.title = 'Create User';
    }
  }

  findUserUsingIdParam() {
    const listOfUsers = this.userService.getListOfUsers() ? this.userService.getListOfUsers() : [];
    // tslint:disable-next-line: radix
    return listOfUsers.find((user) => user.id === this.route.snapshot.params.id);
  }

  submitUser(user: User) {
    if (this.action === 'update') {
      this.store.dispatch(new UpdateUser(user)).subscribe(() => {
        this.router.navigate(['']);
        this.toastr.success("Update of User is Successful..");
      });

      return;
    }
    // this.userService.createUser(user).subscribe((data) => {
    //   this.router.navigate(['']);
    //   this.toastr.success("Creation of User is Successful..");
    // });
    this.store.dispatch(new CreateUser(user)).subscribe(() => {
      this.router.navigate(['']);
      this.toastr.success("Creation of User is Successful..");
    });
  }

}
