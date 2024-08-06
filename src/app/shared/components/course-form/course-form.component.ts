import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl, FormArray,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { lattinLettersAndNumbersValidator } from '@app/shared/validators/custom-validators';
import { Course } from '@app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  submitted: boolean;
  isEditingMode: boolean = false;
  private nextId: number = 1;
  courseId: string | null = null;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStoreService: CoursesStateFacade,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
  ) {
    library.addIconPacks(fas);
    this.courseForm = new FormGroup({
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      author: new FormControl('', Validators.compose([Validators.minLength(2), lattinLettersAndNumbersValidator()])),
      duration: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
      authors: new FormArray([]),
      courseAuthors: new FormArray([]),
    });
    this.submitted = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.isEditingMode = !!this.courseId;

      if (this.isEditingMode && this.courseId) {
        this.coursesService.getCourse(this.courseId).subscribe({
          next: (value: string | Course) => {
            if (typeof value === 'string') {
              console.error('Error loading course data:', value);
            } else {
              this.populateForm(value);
            }
          },
          error: (error) => console.error('Error loading course data:', error),
        });
      }
    });
  }

  get submitButtonText(): string {
    return this.isEditingMode ? 'Update Course' : 'Create Course';
  }

  get author() {
    return this.courseForm.get('author');
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  populateForm(course: Course) {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
    });
  
    this.courseAuthors.clear();
    course.authors.forEach(author => {
      this.courseAuthors.push(new FormControl({ name: author, id: this.nextId++ }));
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (!this.courseForm.valid) {
      this.courseForm.markAllAsTouched();
    } else {
      const {title, description, duration } = this.courseForm.value;
      const newCourse: Course = {
        title,
        description,
        duration,
        authors: this.courseAuthors.value.map((author: { name: string, id: string }) => author.name),
        creationDate: new Date().toISOString(),
      };
      
      if (this.isEditingMode && this.courseId) {
        newCourse.id = this.courseId;
        this.coursesStoreService.editCourse(newCourse, this.courseId);
      } else {
        newCourse.id = '';
        this.coursesStoreService.createCourse(newCourse);
      }
      
      this.onResetForm();
    }
  }

  isCreateAuthorDisabled(): boolean {
    const authorName = this.author?.value;
    const isAuthorInvalid = this.author?.invalid ?? true;
    return !authorName || isAuthorInvalid;
  }

  isSubmitBtnDisabled(): boolean {
    const isTitleInvalid = this.title?.invalid ?? true;
    const isDescriptionInvalid = this.description?.invalid ?? true;
    const isDurationInvalid = this.duration?.invalid ?? true;
    return isTitleInvalid || isDescriptionInvalid || isDurationInvalid;
  }

  isResetBtnDisabled(): boolean {
    const title = this.title?.value || '';
    const description = this.description?.value || '';
    const duration = this.duration?.value || '';

    return title.length === 0 && description.length === 0 && duration.length === 0;
  }

  onCreateAuthor(): void {
    const authorName = this.author?.value;

    if (authorName) {
      this.authors.push(new FormControl({
        name: authorName,
        id: this.nextId++,
      }));
      this.author?.reset();
    }
  }

  onAddAuthorToCourseAuthors(id: number): void {
    const author = this.authors.at(id);
    if (author) {
      this.courseAuthors.push(author);
      this.authors.removeAt(id);
    }
  }

  onRemoveAuthorFromCourseAuthors(id: number): void {
    const author = this.courseAuthors.at(id);
    if (author) {
      this.authors.push(author);
      this.courseAuthors.removeAt(id);
    }
  }

  onResetForm() {
    this.courseForm.reset();
    this.authors.clear();
    this.courseAuthors.clear();
    this.submitted = false;
  }
}
