import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { User } from 'src/app/shared/models/user';
import { HttpDataService } from 'src/app/shared/services/httpDataService';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private httpClient: HttpDataService) {
    httpClient.getAllUsers().subscribe(users => {
      this.users = users;
      console.groupCollapsed(`Recevied users`);
        console.log(`${JSON.stringify(users)}`);
      console.groupEnd();
    });
  }

  ngOnInit(): void {

  }

  onNameChange(val: any) {
    console.log(val);
  }
}
