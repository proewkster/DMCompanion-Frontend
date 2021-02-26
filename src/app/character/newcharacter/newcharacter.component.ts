import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-newcharacter',
  templateUrl: './newcharacter.component.html',
  styleUrls: ['./newcharacter.component.scss']
})
export class NewcharacterComponent implements OnInit {

  constructor(private router: Router) { }
  character: Character = new Character("", 1, "", true, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", "", "", 0, 0, "", "", "", 0, 0);
  public Toevoegen() {

  }
  backToList(): void {
    this.router.navigateByUrl("/Characters");
  }
  public Reset() {

  }
  Resetknop() {

  }
  ngOnInit(): void {
  }

}
