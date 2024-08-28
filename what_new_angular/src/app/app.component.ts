import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Component1Component } from './component-1/component-1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Component1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  title = 'what_new_angular';
}
