import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baba-valuator',
  templateUrl: './baba-valuator.component.html',
  styleUrls: ['./baba-valuator.component.css']
})
export class BabaValuatorComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
