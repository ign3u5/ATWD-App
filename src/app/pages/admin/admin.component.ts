import { Component, OnInit } from '@angular/core';
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
      console.log(users);
    });
  }

  ngOnInit(): void {

  }

  onNameChange(val: any) {
    console.log(val);
  }
}
