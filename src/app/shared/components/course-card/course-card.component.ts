import { Component, Input, EventEmitter, Output } from '@angular/core';

interface Course {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() editable: boolean = true;
  @Input() course: Course = {
    title: '',
    description: '',
    creationDate: new Date(),
    duration: 0,
    authors: [],
  };
  @Output() clickOnShow = new EventEmitter();

  onShow() {
    this.clickOnShow.emit(this.course);
  }
}
