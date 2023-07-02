import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})

export class DirectorInfoComponent implements OnInit {
  /**
   *
   * @param fetchApiData to use functions to make API call
   * @param data specific Director data, received through @MAT_DIALOG_DATA from MovieCard
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}

  /**
   * This function calls specified methods automatically straight after Component was mounted
   */
  ngOnInit(): void {}
}