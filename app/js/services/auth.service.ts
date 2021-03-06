/**
 * Created by martin on 12/4/16.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { AppConfig } from '../Constants/AppConfig';

import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import { User } from "../model/entity/User";
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    getLoggedUser(): Observable<User> {

        if (this.isInitialized) {
            return new Observable<User>((observer) => {
                observer.next(this.loggedUser);
                observer.complete();
            });
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(AppConfig.GET_LOGGED_USER_URL, options)
            .map(this.extractData.bind(this))
            .catch(this.handleError);
    }

    isAuthenticated(): Observable<boolean> {
        return this.getLoggedUser().map(user => {
            return user !== null;
        });
    }

    googleSignIn() {
        window.location.href = AppConfig.GOOGLE_SIGN_IN_URL;
    }

    logout(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http
            .get(AppConfig.LOGOUT_URL, options)
            .map(res => {
                this.isInitialized = false;
                this.loggedUser = null;

                return res;
            });
    }

    private extractData(res: Response): User {
        this.loggedUser = res.json();
        this.isInitialized = true;
        return this.loggedUser;
    }

    private handleError(response: any) {
        this.loggedUser = null;
        this.isInitialized = true;


        return Observable.throw('not authenticated');
    }

    private isInitialized: boolean;
    private loggedUser: User = null;

    redirectUrl: string;
}
