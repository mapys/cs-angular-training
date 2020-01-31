import { User } from 'src/app/shared/models/User';

export class GetUsers {
    static readonly type =  '[User] Get list of users';
}

export class CreateUser{
    static readonly type = "[User] Create User";
    constructor(public payload:User){}
}

export class GetUser{
    static readonly type = "[User] Get User";
    constructor(public payload:User){}
}

export class UpdateUser{
    static readonly type = "[User] Update User";
    constructor(public payload:User){}
}

export class DeleteUser{
    static readonly type = "[User] Delete User";
    constructor(public payload:String){}
}

export class SetSelectedUser{
    static readonly type = "[User] Set Selected User";
    constructor(public payload: User){}
}