import { Component, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

import { NewsService } from '../../Services/news.service';
import { News } from '../../Interfaces/news';

@Component({
  selector: 'app-add-edit-news-dialog',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-news-dialog.component.html',
  styleUrl: './add-edit-news-dialog.component.css'
})

export class AddEditNewsDialogComponent implements OnInit {
  newsForm: FormGroup;
  titleDialog: string = "Add News";
  actionName: string = "Create";

  constructor(
    private dialogRef: MatDialogRef<AddEditNewsDialogComponent>,
    private newsService: NewsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public news: News
  ) {
    this.newsForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
      ])
    })
  }

  ngOnInit(): void {
    if (this.news) {
      this.newsForm.patchValue({
        title: this.news.title,
        description: this.news.description
      })

      this.titleDialog = "Update News";
      this.actionName = "Save";
    }
  }

  addEditNews() {
    const model: News = {
      id: this.news.id,
      title: this.newsForm.value.title,
      description: this.newsForm.value.description
    };

    if (this.news == null) {
          
      this.newsService.add(model).subscribe({
        next: (data) => {
          this.dialogRef.close("ok")
        },
        error: (err) => {}
      })
    }
    else {//update
      this.newsService.update(this.news.id, model).subscribe({
        next: (data) => {
          this.dialogRef.close("ok")
        },
        error: (err) => {}
      })
    } 
  }
}

