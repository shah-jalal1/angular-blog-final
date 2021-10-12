import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postEmployee(data:any) {
    return this.http.post<any>("https://dev.softlabit.com/api/v1/blog/add-blog", data)
    .pipe(map((res:any)=>{
      return res;
    }))
    }

    getPost(){
      return this.http.get<any>("https://dev.softlabit.com/api/v1/blog/get-all-blogs").pipe(map((res:any)=>{
        return res;
      }));
    }

    // getEmployee(){
    //   return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
    //     return res;
    //   }));
    // }

    updateEmployee(data: any, id: number){
      return this.http.put<any>("http://localhost:3000/posts/"+id, data).pipe(map((res:any)=>{
        return res;
      }));
    }


    deleteEmployee(id: number){
      return this.http.delete<any>("https://dev.softlabit.com/api/v1/blog/delete-blog-by-id/"+id).pipe(map((res:any)=>{
        return res;
      }));
    }

   
 

}