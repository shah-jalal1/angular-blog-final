import { PostModel } from './../interface/post-model';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const API_BLOG = environment.apiBaseUrl + '/api/v1/blog/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postPost(data:any) {
    return this.http.post<{success: boolean; data: PostModel[]; count: number}>(API_BLOG+'add-blog', data)
    .pipe(map((res:any)=>{
      return res;
    }))
    }

    getPost(){
      return this.http.get<{success: boolean; data: PostModel[]; count: number}>(API_BLOG+'get-all-blogs').pipe(map((res:any)=>{
        return res;
      }));
    }

    getPostById(id : number) {
      return this.http.get<{success: boolean; data: PostModel[]; count: number}>(API_BLOG+'get-blog-by-blog-id/'+id).pipe(map((res:any)=>{
        return res;
      }));
    }


    updatePost(data: any, id: number){
      return this.http.put<{success: boolean; data: PostModel[]; count: number}>(API_BLOG+'edit-blog-by-id/'+id, data).pipe(map((res:any)=>{
        return res;
      }));
    }


    deletePost(id: number){
      return this.http.delete<{success: boolean; data: PostModel[]; count: number}>(API_BLOG+'delete-blog-by-id/'+id).pipe(map((res:any)=>{
        return res;
      }));
    }

   
 

}
