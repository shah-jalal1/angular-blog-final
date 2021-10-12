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
      // console.log(res.data)
      this.postData = res;
    })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row._id)
    .subscribe(res=> {
      console.log("Delete row", row);
      alert("employee deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelobj.id = row._id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['slug'].setValue(row.slug);
    this.formValue.controls['shortDescription'].setValue(row.shortDescription);
  }

  updateEmployeeDetails() {
   
    this.employeeModelobj.title = this.formValue.value.title;
    this.employeeModelobj.author = this.formValue.value.author;
    this.employeeModelobj.slug = this.formValue.value.slug;
    this.employeeModelobj.shortDescription = this.formValue.value.shortDescription;

    this.api.updateEmployee(this.employeeModelobj, this.employeeModelobj.id)
    .subscribe(res => {
      alert("updated successfullay");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}