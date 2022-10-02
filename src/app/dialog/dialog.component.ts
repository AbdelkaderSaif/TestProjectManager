import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../model/task';
import { CrudService } from '../service/crud.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  projectForm !: FormGroup;
  
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string='';

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  constructor(private crudService : CrudService,
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.projectForm= this.formBuilder.group({
      projectName:['',Validators.required],
      taskName:['',Validators.required],
      comment:['',Validators.required],
      dateAssignment:['',Validators.required],
      dateDeposit:['',Validators.required]
    })
    this.taskObj = new Task();
    this.taskArr =[];
    this.getAllTask();
  }

  addProject(){
    if(this.projectForm.valid){
      this.crudService.Projects(this.projectForm.value)
      .subscribe({
        next:(res)=>{
          alert("product added successfully")
          this.projectForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
      })
    }
  }

  getAllTask() {
this.crudService.getAllTask().subscribe(res=>{
  this.taskArr=res;
}, err =>{
  alert("Unable to get list of tasks")
})  }

  addTask(EditTask:Task){
    this.crudService.addTask(EditTask).subscribe(res =>{
      this.ngOnInit();
    }, err =>{
      alert(err);
    })
  }

  editTask(){
    this.crudService.EditTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
    }, err=>{
      alert("Failed to update task");
    })
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Failed to delete Task");
    })
  }
}
