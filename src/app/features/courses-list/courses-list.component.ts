import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;
  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  onShow(course: Course) {
    this.showCourse.emit(course);
  }

  onEdit(course: Course) {
    this.editCourse.emit(course);
  }

  onDelete(course: Course) {
    this.deleteCourse.emit(course);
  }
}
