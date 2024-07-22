import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormControl, FormArray,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { lattinLettersAndNumbersValidator } from '@app/shared/validators/custom-validators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  submitted: boolean;

  private nextId: number = 1;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      author: new FormControl('', [Validators.minLength(2), lattinLettersAndNumbersValidator()]),
      duration: new FormControl('', [Validators.required, Validators.min(0)]),
      authors: new FormArray([]),
      courseAuthors: new FormArray([]),
    });
    this.submitted = false;
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

  onSubmit(): void {
    this.submitted = true;
    
    if (!this.courseForm.valid) {
      this.courseForm.markAllAsTouched();
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
