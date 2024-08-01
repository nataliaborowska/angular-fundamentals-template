import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Course } from '../../../services/courses.service';

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
    creationDate: '',
    duration: 0,
    authors: [],
    id: '',
  };
  @Output() clickOnShow = new EventEmitter<Course>();

  onShow() {
    this.clickOnShow.emit(this.course);
  }
}
