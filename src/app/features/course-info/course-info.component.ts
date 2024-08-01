import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

interface CourseInfo {
  title: string;
  description: string;
  id: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  constructor(private location: Location) {}

  @Input() course: CourseInfo = {
    title: '',
    description: '',
    id: '',
    creationDate: new Date(),
    duration: 0,
    authors: [],
  };

  goBack(): void {
    this.location.back();
  }
}
