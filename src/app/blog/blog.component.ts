import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogId: any;
  postData !: any;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    console.warn("user id is: ", this.route.snapshot.paramMap.get('id'));
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.getPostById();

  }

  getPostById() {
    this.api.getPostById(this.blogId)
      .subscribe(res => {
        if (res.success) {
          console.log(res.data)
          this.postData = res;
        }

      }, (err) => {
        console.log(err)
      })
  }

}
