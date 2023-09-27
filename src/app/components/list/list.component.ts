import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  books: Book[] = [];

  constructor(public dataServ: DataService){}

  ngOnInit(): void {
    this.dataServ.allBooks.subscribe(books => this.books = books);
  }

}
