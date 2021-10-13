import { PostModel } from '../../interface/post-model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postModelobj : PostModel = new PostModel(); 
  postDatas !: any;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    this.api.getPost()
    .subscribe(res=> {
      // console.log(res.data)
      this.postDatas = res;
    })
  }

}
