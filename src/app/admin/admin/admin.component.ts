import { PostModel } from './post-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelobj : PostModel = new PostModel(); 
  postData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;


  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      author: [''],
      slug: [''],
      shortDescription: ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelobj.title = this.formValue.value.title;
    this.employeeModelobj.author = this.formValue.value.author;
    this.employeeModelobj.slug = this.formValue.value.slug;
    this.employeeModelobj.shortDescription = this.formValue.value.shortDescription;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res=> {
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=> {
      alert("something went wrong")
    })
  }

  getAllEmployee() {
    this.api.getPost()
    .subscribe(res=> {
      console.log(res.data)
      this.postData = res;
    })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
    .subscribe(res=> {
      alert("employee deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['description'].setValue(row.description);
  }

  // updateEmployeeDetails() {
  //   this.employeeModelobj.id = this.formValue.value.id;
  //   this.employeeModelobj.firstName = this.formValue.value.firstName;
  //   this.employeeModelobj.lastName = this.formValue.value.lastName;
  //   this.employeeModelobj.salary = this.formValue.value.salary;
  //   this.employeeModelobj.description = this.formValue.value.description;

  //   this.api.updateEmployee(this.employeeModelobj, this.employeeModelobj.id)
  //   .subscribe(res => {
  //     alert("updated successfullay");
  //     let ref = document.getElementById('cancel');
  //     ref?.click();
  //     this.formValue.reset();
  //     this.getAllEmployee();
  //   })
  // }

}