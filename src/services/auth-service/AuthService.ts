import { Injectable, EventEmitter } from '@angular/core';
import { SqliteDatabaseService } from '../sqlite-database-service';
import { FirebaseService } from '../Firebase/FirebaseService';

@Injectable()
export class AuthService {

    private isAuth: boolean;
    private userEmail: string;
    public authenticationStream: EventEmitter<any> = new EventEmitter<any>();
    public registerStream: EventEmitter<any> = new EventEmitter<any>();
    
    constructor(private db: SqliteDatabaseService, private auth: FirebaseService) {
   
    }

    login(username, password): any {
        this.auth.loginWithUsernamePassword(username, password).then(result => {
            this.isAuth = true;
            this.userEmail = username;
            this.db.add('current-user-app', this.userEmail);
            this.db.add(this.userEmail, result.user.displayName );
            this.authenticationStream.emit(
                {
                    username: username, 
                    password: password, 
                    errors: false,
                    loggedIn: true
                });
        }).catch(err => {
            this.authenticationStream.emit(
                {
                    username: username, 
                    password: password, 
                    errors: true,
                    loggedIn: false
                });
        });
        
    }

    logout() {
        this.auth.logout().then(result => {
            this.isAuth = false;
            this.db.remove('current-user-app');
            this.db.remove(this.userEmail);
            this.userEmail = '';
            this.authenticationStream.emit({
                loggedIn: false
            });
        });
    }

    isAuthenticated(): boolean {
        return this.isAuth;
    }

    getUserEmail(): string {
        return this.userEmail;
    }

    // getUsers(): AngularFireList<any> {
    //     //return this.auth.readAllUsers();
    // }

    exists(email: string): any {
        this.auth.existsPromise(email);
    }

    register(user: any, addedKey?: any) {
        this.auth.register(user.email, user.password).then(data => {
            this.registerStream.emit({
                success: true,
            });
        }).catch(err => {
            this.registerStream.emit({
                success: false,
                message: err.message
            });
        });
    }
  
}