import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Course {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;
  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

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
