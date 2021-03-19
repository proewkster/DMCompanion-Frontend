import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  private _returnUrl: string;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get return URL from original visited URL
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToLogin = () => {
    this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: this._returnUrl }});
  }
}
