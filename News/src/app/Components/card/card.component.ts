import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEditNewsDialogComponent } from '../add-edit-news-dialog/add-edit-news-dialog.component';
import { DeleteNewsDialogComponent } from '../delete-news-dialog/delete-news-dialog.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() news: any;
  @Output() loadNewsHandler = new EventEmitter();

  constructor(public dialog: MatDialog) {}
  
  editNews() {
    this.dialog.open(AddEditNewsDialogComponent,
      {
        disableClose: true,
        width: "550px",
        data: this.news
      })
      .afterClosed().subscribe( result => {
        if (result === 'ok') {
          this.loadNewsHandler.emit();
        }
      });
  }

  deleteNews() {
    this.dialog.open(DeleteNewsDialogComponent, {
      disableClose: true,
      width: "350px",
      data: this.news
    })
    .afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.loadNewsHandler.emit();
      }
    });
  }
}
