import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractFormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  form: FormGroup;
  notes: any;
  index: number;
  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService) {
    this.notes = [];
    this.index = 0;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'title': [],
      'body': [],
      'id': []
    });
  }
  onSubmit(note) {
    let isExist = this.notes.filter(x => x.id == note.id);
  
    if (isExist && note.id != null) {
      
      this.spinner.show();
      this.http.put<any>('https://httpbin.org/put', { body: note.value }).subscribe(
        result => {
          this.spinner.hide();
          this.form.setValue({
            id: note.id,
            title: note.title,
            body: note.body
          });
          let itemIndex = this.notes.findIndex(item => item.id == note.id);
          this.notes[itemIndex] = this.form.value;
        }
      )

    } else {

      this.http.post<any>('https://httpbin.org/post', { body: note }).subscribe(
        result => {
          
          this.index = this.index + 1
          let newnote = JSON.parse(result.data).body;
          newnote.id = this.index;
          this.notes.push(newnote);
        },
        (error) => {                              //Error callback
          console.error('error caught in component')         
        }
      )



    }
  }

  addNewNote() {
    this.form.reset();
  }


  deleteNotes(id) {

    this.notes = this.notes.filter(x => x.id != id)

    this.form.reset();
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
