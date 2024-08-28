import { ChangeDetectionStrategy, Component, computed, effect, input, model, OnInit, Output, output, signal } from '@angular/core';
import { outputFromObservable, outputToObservable, toObservable, ToObservableOptions } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, of } from 'rxjs';

@Component({
  selector: 'app-component-2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './component-2.component.html',
  styleUrl: './component-2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component2Component implements OnInit{
  age = model(0);
  // age multiplied by two.
  ageMultiplied = computed(() => this.age() * 2);
  input1 = signal('');
  input1$ = toObservable(this.input1);
  private ob$ = new BehaviorSubject([1, 2, 3]);
  // create output from observable
  computeInput1 = computed(() => {
    return `computed runing....${this.input1()}`;

  })
  count = outputFromObservable(this.ob$);
  count$ = outputToObservable(this.count);
  constructor() {
    effect(() => {
      console.log(`something changing...${this.input1()}`)
    })
    effect(() => {
      console.log(`age changing...${this.age()}`)
    })
  }
  ngOnInit() {
    setInterval(() => {
      this.age.set(111);
    }, 5000)
    this.count$.subscribe(r => console.log(r))
    setTimeout(() => {
      this.ob$.next([4,5,6]);
    }, 5000);
    this.input1$.subscribe(r => console.log(r))
  }
}
