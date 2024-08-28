import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  _http = inject(HttpClient);
  title = 'process_queue';
  ngOnInit() {
    for(let i = 1; i< 30; i ++) {
      this._http.get(`https://jsonplaceholder.typicode.com/todos/${i}`).subscribe(r => {
        console.log(r)
      });
    }
    setTimeout(() => {
      this._http.get(`https://jsonplaceholder.typicode.com/todos/${31}`).subscribe(r => {
        console.log(r)
      });
    }, 5000);
  }
}
