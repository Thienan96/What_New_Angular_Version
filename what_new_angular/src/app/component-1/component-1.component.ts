import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { Component2Component } from '../component-2/component-2.component';

@Component({
  selector: 'app-component-1',
  standalone: true,
  imports: [Component2Component],
  templateUrl: './component-1.component.html',
  styleUrl: './component-1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component1Component implements OnInit{
  // ob!: Observable<any>();
  age = signal(0);
  constructor() {
    effect(() => {
      console.log(`age change from component 1 ${this.age()}`)
    })
  }
  ngOnInit(): void {
      setInterval(() => {
        this.age.set(Math.floor(Math.random() * 10));
      }, 3000);
  }
  handleCount(event: number[]) {
    console.log(event);
    // this.ob = outputToObservable(event);
  }
}
