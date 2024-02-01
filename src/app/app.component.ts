import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Student } from './student';
import { Course } from './course';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  students: Student[] = [];

  selectedStudent: Student = this.getStudentById(-1);

  Course = Course;

  ngOnInit(): void {
    this.students = [
      {
        id: 0,
        firstName: "Joe",
        lastName: "Smith",
        isActive: true,
        courses: [
          Course.MachineLearning
        ]
      },
      {
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        isActive: false,
        courses: [
          Course.IntroToHtml,
          Course.FunctionalJavaScript
        ]
      }
    ];
    this.addStudent();
  }

  selectStudent(student: Student): void {
    this.stageStudent(student);
  }

  addStudent(): void {
    this.stageStudent(this.getStudentById(-1));
  }

  deleteStudent(student: Student): void {
    this.students.splice(this.students.indexOf(student), 1);
    if (this.selectedStudent.id === student.id) {
      this.addStudent();
    }
  }

  saveStudent(): void {
    const isNew = this.selectedStudent.id === -1;
    const student = isNew ? this.selectedStudent : this.getStudentById(this.selectedStudent.id);
    
    if (isNew) {
      student.id = this.getNextId();
      this.students.push(student);
    } else {
      student.firstName = this.selectedStudent.firstName;
      student.lastName = this.selectedStudent.lastName;
      student.isActive = this.selectedStudent.isActive;
      student.courses = this.selectedStudent.courses;
    }

    this.stageStudent(student);
  }

  cancelSave(): void {
    this.stageStudent(this.getStudentById(this.selectedStudent.id));
  }

  private getNextId(): number {
    if (this.students.length === 0) {
      return 0;
    }
    return this.students.map(s => s.id).reduce((prev, current) => (prev > current) ? prev : current) + 1;
  }

  private getStudentById(id: number): Student {
    if (id == -1) {
      return {
        id: id,
        firstName: null!,
        lastName: null!,
        isActive: false,
        courses: []
      }
    }
    return this.students.find((s) => s.id === id)!
  }

  private stageStudent(student: Student): void {
    this.selectedStudent = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      isActive: student.isActive,
      courses: [...student.courses]
    }
  }
}
