import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NewUser } from 'src/app/shared/models/new-user';
import { User } from 'src/app/shared/models/user';
import { HttpDataService } from 'src/app/shared/services/httpDataService';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss','../../shared/styles/form.scss']
})
export class AdminComponent implements OnInit {
  users: User[];
  updatedUsers: User[];
  isUserUpdated: boolean[];
  isUserValid: boolean[];
  emailValidator = new FormControl('', Validators.email);
  creatingNewUser = false;
  newUser: NewUser;

  public newUserForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
});

  public get username() { return this.newUserForm.get('username'); }
  public get password() { return this.newUserForm.get('password'); }
  public get firstName() { return this.newUserForm.get('firstName'); }
  public get lastName() { return this.newUserForm.get('lastName'); }
  public get email() { return this.newUserForm.get('email'); }

  constructor(private httpClient: HttpDataService, private formBuilder: FormBuilder) {
    this.loadUsers();
  }

  private loadUsers()
  {
    console.log(`Requesting all users`);
    this.httpClient.getAllUsers()
      .subscribe(users => {
        this.users = users;
        console.groupCollapsed(`Recevied users`);
          console.log(`${JSON.stringify(users)}`);
        console.groupEnd();
        this.isUserUpdated = new Array(this.users.length);
        this.isUserValid = this.initialisedArray(true, users.length);
        this.updatedUsers = users.map(user => this.cloneUser(user));
    });
  }

  private initialisedArray<T>(initialValue: T, length: number): T[]
  {
    var array = new Array(length);
    for (var i = 0; i < array.length; i++)
    {
      array[i] = initialValue;
    }
    return array;
  }

  private cloneUser(user: User): User
  {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      privilegeLevel: user.privilegeLevel
    };
  }

  ngOnInit(): void {

  }
  
  onFirstNameUpdate(update: string, index: number)
  {
    if (update) {
      this.updatedUsers[index].firstName = update;
      this.isUserUpdated[index] = true;
    }
  }

  onLastNameUpdate(update: string, index: number)
  {
    if (update) {
      this.updatedUsers[index].lastName = update;
      this.isUserUpdated[index] = true;
    }
  }
  
  onEmailUpdate(update: string, index: number)
  {
    this.emailValidator.setValue(update);
    console.log(this.emailValidator.status);
    this.isUserValid[index] = false;

    if (this.emailValidator.status == "VALID" && update)
    {
      this.updatedUsers[index].email = update;
      this.isUserUpdated[index] = true;
      this.isUserValid[index] = true;
    }
  }

  onSubmitNewUser() {
    this.newUser = { 
      ...this.newUserForm.value,
      privilegeLevel: 2
    };
    console.log(`New user: ${JSON.stringify(this.newUser)}`);
    this.httpClient.createNewUser(this.newUser)
      .subscribe(() => {
        this.addNewUserToTable(this.newUser);
        this.newUserForm.reset();
      });
  }

  private addNewUserToTable(userToInsert: User)
  {
    this.updatedUsers.push(this.cloneUser(userToInsert));
    this.users.push(this.cloneUser(userToInsert));
    this.isUserUpdated.push(false);
    this.isUserValid.push(true);
  }

  onSave(index: number) {
    console.log(`Updated user ${JSON.stringify(this.updatedUsers[index])}`);
    this.httpClient.updateUser(this.updatedUsers[index])
      .subscribe(() => {
        console.log(`${this.updatedUsers[index].username} has been successfully saved`);
        alert(`${this.updatedUsers[index].username}'s profile has been saved successfully`);
      })
    this.isUserUpdated[index] = false;
  }

  onDelete(index: number) {
    console.log(`Deleted user ${this.updatedUsers[index].username}`);
    this.httpClient.deleteUser(this.updatedUsers[index].username)
      .subscribe(() => {
        console.log(`${this.updatedUsers[index].username} has been successfully deleted`);
        alert(`${this.updatedUsers[index].username}'s profile has been deleted successfully`);
        this.loadUsers();
      });
  }
}
