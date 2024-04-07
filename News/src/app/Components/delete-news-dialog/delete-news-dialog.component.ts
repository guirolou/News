import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { News } from '../../Interfaces/news';
import { NewsService } from '../../Services/news.service';

@Component({
  selector: 'app-delete-news-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './delete-news-dialog.component.html',
  styleUrl: './delete-news-dialog.component.css'
})
export class DeleteNewsDialogComponent implements OnInit {

  constructor (
    private dialogRef: MatDialogRef<DeleteNewsDialogComponent>,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public news: News
  ) {}
  ngOnInit(): void {
    
  }

  confirmDelete(){
    if (this.news) {
      this.newsService.delete(this.news.id).subscribe({
        next: (data) => {
          this.dialogRef.close("ok");
        },
        error: (err) => {}
      }) 
    }
  }
}
