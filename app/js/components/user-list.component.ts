import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Converter } from '../model/entity/Converter';
import {User} from "../model/entity/User";
import  * as UserRole from '../Constants/UserRole';

@Component({
    moduleId: __filename,
    selector: 'user-list',
    templateUrl: '../../view/user-list.component.html'
})

export class UserListComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.users = [];
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(
            users => this.users = users,
            error => console.log(error)
        );
    }

    makeAssignable(userId: string, setIsAssignable: boolean): void {
        this.userService
            .updateUser(userId, setIsAssignable)
            .subscribe(
                () => {
                    this.users = this.users.map(user => {
                        if (user.id === userId) {
                            user.isAssignable = setIsAssignable;
                        }
                        return user;
                    });
                },
                (err) => {
                    console.error(err);
                }
        );
    }

    confirmUser(userId: string): void {
        this.userService
            .updateUserRole(userId, UserRole.USER)
            .subscribe(
                () => {
                    this.users = this.users.map(user => {
                        if (user.id === userId) {
                            user.role = UserRole.USER;
                        }
                        return user;
                    });
                },
                (err) => {
                    console.error(err);
                }
        );
    }

    users: User[];
    query: string = '';
}
