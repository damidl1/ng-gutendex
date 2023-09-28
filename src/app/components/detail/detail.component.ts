import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  selectedBook: Book | undefined;

  constructor(public dataServ: DataService, private route: ActivatedRoute){}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const bookId = +params['id'];
      this.selectedBook = this.dataServ.getBookById(bookId);
    });


  }

}
