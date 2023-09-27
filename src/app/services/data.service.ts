import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Book } from '../model/book';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allBooks = new BehaviorSubject<Book[]>([]);
  pageBooks = new BehaviorSubject<Book[]>([]);


  readonly BASE_URL = 'https://gutendex.com/books/';

  pageNumber = 1;
  maxPageNumber = 0;


  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  // getAllBooks(): void{
  //   this.http.get<any>(this.BASE_URL).pipe(
  //     map(data => data.results)
  //   ).subscribe(books => this.allBooks.next(books));
  // }

  getAllBooks(): void{
    this.http.get<any>(this.BASE_URL).pipe(
      map(books => {
        this.allBooks.next(books.results);
        this.maxPageNumber = books.results.length % 10 === 0 ? books.results.length / 10 : Math.floor(books.results.length / 10) + 1;
        this.getBookByPosition(this.pageNumber);
      })
    ).subscribe();
  }

  getBookByPosition(position: number): void{
    position = (position - 1) * 10;
    this.pageBooks.next(this.allBooks.value.slice(position, position + 10));
  }

  prevPage(){
    if (this.pageNumber > 1) {
      this.pageNumber --;
      this.getBookByPosition(this.pageNumber);
    }
  }

  nextPage(){
    if (this.pageNumber >= this.maxPageNumber) {
      return;

    }

    if (this.pageNumber < this.allBooks.value.length -10) {
      this.pageNumber++;
      this.getBookByPosition(this.pageNumber);
    }

  }
}
