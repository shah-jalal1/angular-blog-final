import { PostModel } from '../../interface/post-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formValue !: FormGroup;
  postModelobj: PostModel = new PostModel();
  postData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;


  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      author: [''],
      slug: [''],
      shortDescription: ['']
    })
    this.getAllPost();
  }

  clickAddPost() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPostDetails() {
    this.postModelobj.title = this.formValue.value.title;
    this.postModelobj.author = this.formValue.value.author;
    this.postModelobj.slug = this.formValue.value.slug;
    this.postModelobj.shortDescription = this.formValue.value.shortDescription;

    this.api.postPost(this.postModelobj)
      .subscribe(res => {
        if (res.success) {
          console.log(res);
          alert("Post Added Successfully");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
        }
        this.getAllPost();
      },
        err => {
          alert("something went wrong")
        })
  }

  getAllPost() {
    this.api.getPost()
      .subscribe(res => {
        if (res.success) {
          this.postData = res;
        }
      }, (err) => {
        console.log(err)
      })
  }

  deletePost(row: any) {
    this.api.deletePost(row._id)
      .subscribe(res => {
        if (res.success) {
          console.log("Delete row", row);
          alert("Post deleted");
        }
        this.getAllPost();
      }, (err) => {
        console.log(err)
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.postModelobj.id = row._id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['slug'].setValue(row.slug);
    this.formValue.controls['shortDescription'].setValue(row.shortDescription);
  }

  updatePostDetails() {

    this.postModelobj.title = this.formValue.value.title;
    this.postModelobj.author = this.formValue.value.author;
    this.postModelobj.slug = this.formValue.value.slug;
    this.postModelobj.shortDescription = this.formValue.value.shortDescription;

    this.api.updatePost(this.postModelobj, this.postModelobj.id)
      .subscribe(res => {
        if (res.success) {
          alert("updated successfullay");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
        }
        this.getAllPost();
      }, (err) => {
        console.log(err)
      })
  }

}