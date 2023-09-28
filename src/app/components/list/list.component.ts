import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  books: Book[] = [];


  constructor(public dataServ: DataService, private router: Router){}

  ngOnInit(): void {
    this.dataServ.pageBooks.subscribe(books => this.books = books);
  }

  openDetail(bookId: number): void{
    this.router.navigate(['/detail', bookId])
  }

}
