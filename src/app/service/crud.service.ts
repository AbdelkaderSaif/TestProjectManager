import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL :string;

  constructor(private http: HttpClient) {
    this.serviceURL ="http://localhost:3000/tasks"
   }

   Projects(data:any){
    return this.http.post<any>("http://localhost:3000!: /products/",data)
   }
   getProjects(){
    return this.http.get<any>("http://localhost:3000/products/");
   }
   addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.serviceURL,task);
   }

   getAllTask(): Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceURL);
   }

   deleteTask(task: Task): Observable<Task>{
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
   }

   EditTask(task: Task): Observable<Task>{
    return this.http.put<Task>(this.serviceURL,task)
   }
}
