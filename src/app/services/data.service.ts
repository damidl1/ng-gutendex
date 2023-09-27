import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Book } from '../model/book';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allBooks = new BehaviorSubject<Book[]>([]);

  readonly BASE_URL = 'https://gutendex.com/books/';

  pageNumber = 1;

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  getAllBooks(): void{
    this.http.get<any>(this.BASE_URL + this.pageNumber).pipe(
      map(data => data.results)
    ).subscribe(books => this.allBooks.next(books));
  }

  prevPage(){
    if (this.pageNumber > 1) {
      this.pageNumber --;
      this.getAllBooks();
    }
  }

  nextPage(){
    this.pageNumber ++;
    this.getAllBooks();
  }
}
