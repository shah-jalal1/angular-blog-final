import { PostModel } from './../../admin/admin/post-model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeeModelobj : PostModel = new PostModel(); 
  postDatas !: any;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.api.getPost()
    .subscribe(res=> {
      // console.log(res.data)
      this.postDatas = res;
    })
  }

}
