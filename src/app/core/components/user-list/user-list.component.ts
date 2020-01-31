import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/User';
import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetSelectedUser } from '../../actions/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() users: Array<User> = [];
  @Output() selectedUser = new EventEmitter();
  @Output() emitDeleteUser = new EventEmitter();
  constructor(private router: Router,
              private userService: UserService,
              private store: Store) { }

  ngOnInit() {
    this.userService.setListOfUsers(this.users);
  }
  ngAfterViewInit() {}
  ngOnDestroy() {}
  ngOnChanges() {}

  selectUser(user: User) {
    this.selectedUser.emit(user);
  }

  deleteUser(user: User) {
    this.emitDeleteUser.emit(user);
  }

  // redirectToEdit(user: User) {
  //   this.router.navigate([`form/${user.id}`]);
  // }

  redirectToEdit(user: User) {
    this.store.dispatch(new SetSelectedUser(user));
    this.router.navigate([`form/${user.id}`]);
  }

  
}
