import { User } from 'src/app/shared/models/User';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { state } from '@angular/animations';
import { UserService } from 'src/app/shared/services/user.service';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { GetUsers, CreateUser, UpdateUser, SetSelectedUser, DeleteUser } from '../actions/user.actions';

export class UserStateModel {
    listOfUsers: User[];
    selectedUser: User;
}

@State<UserStateModel>({
    name: 'userstate',
    defaults:{
        listOfUsers: [],
        selectedUser: null
    }
})

export class UserState{
    constructor(private userService: UserService, private store: Store){}

    @Selector()
    static getListOfUsers(state: UserStateModel){
        return state.listOfUsers;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel){
        return state.selectedUser;
    }

    @Selector()
    static getUserState(state: UserStateModel){
        return state;
    }

    @Action(GetUsers)
    public getUsers({getState, patchState}: StateContext<UserStateModel>, {payload}){
        return this.userService.getUsers().pipe(
            tap((users: User[]) => {
                patchState({
                    listOfUsers : users
                })
            }),
            catchError((error) => {
                return throwError(error);
            })
        )
    }

    @Action(CreateUser)
    public createUser({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser){
        return this.userService.createUser(payload).pipe(
            tap((users: User[]) => {
                this.store.dispatch(new GetUsers());
                return users;
            }),
            catchError((error) => {
                return throwError(error);
            })
        )
    }

    @Action(UpdateUser)
    public updateUser({getState, patchState}: StateContext<UserStateModel>, {payload}: UpdateUser){
        return this.userService.updateUser(payload).pipe(
            tap((users: User[]) => {
                this.store.dispatch(new GetUsers());
                return users;
            }),
            catchError((error) => {
                return throwError(error);
            })
        )
    }

    @Action(SetSelectedUser)
    public setSelectedUser({patchState, getState}: StateContext<UserStateModel>, {payload}: SetSelectedUser){
        patchState({
            ...state,
            selectedUser: payload
        })
    }

    @Action(DeleteUser)
    public deleteUser({patchState}: StateContext<UserStateModel>, {payload}: DeleteUser){
        return this.userService.deleteUser(payload).pipe(
            tap((users: User[]) => {
                this.store.dispatch(new GetUsers());
                return users;
            }),
            catchError((error) => {
                return throwError(error);
            })
        )
    }
}