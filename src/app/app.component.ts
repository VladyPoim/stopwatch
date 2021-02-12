import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timerStart = false;
  title = 'stopwatch';
  numberOfClick = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  // tslint:disable-next-line:max-line-length
  secondsToStr: string = '' + ('00' + this.hours).substr(-2) + '  : ' + ('00' + this.minutes).substr(-2) + '  : ' + ('00' + this.seconds).substr(-2);
  subscriber;
  stopwatch = new Observable(observer => {
      const intervalId = setInterval(() => {
        observer.next(this.seconds++);
        // tslint:disable-next-line:max-line-length
        this.updateTime();
        if (this.seconds >= 59) {
          this.minutes++;
          this.seconds = -1;
        }
        if (this.minutes >= 60) {
          this.hours++;
          this.minutes = 0;
        }
      }, 1000);
      return () => {
      clearInterval(intervalId);
    };
  });
  updateTime(): void {
    // tslint:disable-next-line:no-unused-expression max-line-length
    this.secondsToStr = '' + ('00' + this.hours).substr(-2) + '  : ' + ('00' + this.minutes).substr(-2) + '  : ' + ('00' + this.seconds).substr(-2);
  }
  startStopTimer(): any {
    this.timerStart = !this.timerStart;
    if (this.timerStart) {
      this.subscriber = this.stopwatch.subscribe();
    }
    else {
      this.resetTimer();
      this.subscriber.unsubscribe();
    }
  }
  waitTimer(): void {
    this.timerStart = false;
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
  resetTimer(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.updateTime();
  }

  clickEvent(): any {
    this.numberOfClick++;
    setTimeout(() => {
      if (this.numberOfClick === 2) {
        this.numberOfClick = 0;
        this.waitTimer();
      }else {
        this.numberOfClick = 0;
      }
    }, 300);
  }
}
