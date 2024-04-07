import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { News } from './Interfaces/news';
import { NewsService } from './Services/news.service';
import { CardComponent } from './Components/card/card.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AddEditNewsDialogComponent } from './Components/add-edit-news-dialog/add-edit-news-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    CardComponent,
    FormsModule,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'News';
  baseUrl: string = environment.baseUrl;
  newsList: News[] = [];

  constructor (private newsService: NewsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadNews();
  }

  openDialog(): void {
    this.dialog.open(AddEditNewsDialogComponent,
      {
        disableClose: true,
        width: "550px"
      })
      .afterClosed().subscribe( result => {
        if (result === 'ok') {
          this.loadNews();
        }
      });
  }

  loadNews() {
    this.newsService.getList().subscribe({
      next:(data) => {
        this.newsList = data;
      },
      error:(excepction) => {
        console.log(excepction)
      } 
    });
  }
}
