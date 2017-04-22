import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {UserService} from './user.service';
@Component({
  selector: 'dataform',
  template: `
  <form [formGroup]="myForm" (ngSubmit)="submitForm(myForm)">
    
    <label for="name" >Name</label><br>
    <input name= "name" type="text" [formControl]="myForm.controls['name']" #name /><br>
    <div *ngIf="!myForm.controls['name'].valid">Required</div>
    
    <label for="email" >Email</label><br>
    <input name="email" type="text" [formControl]="myForm.controls['email']" #email/><br>
    <div *ngIf="!myForm.controls['email'].valid">Required</div>
    
    <label for="post" >Post</label><br>
    <textarea name="post" type="text" [formControl]="myForm.controls['post']" ></textarea>
    <div *ngIf="!myForm.controls['post'].valid">Minimum Length 10</div><br>
    <input type="submit" value="Submit" [disabled]="!myForm.valid" />
    <input type="submit" value="Get Data" (click)="getData(myForm.controls['name'].value)"/>
  </form>
  `,
  providers:[UserService]
})
export class DataformComponent {
  myForm:FormGroup;
  constructor(fb:FormBuilder,private userService:UserService){
    this.myForm = fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      post:['',Validators.compose([Validators.required,this.validate])]
    });
  }

  submitForm(form){
    console.log(form.value);
  }

  validate(control:FormControl){
      if(control.value.Length<10){
        console.log('valid');
        return {'invalid':true};
      }
       return null; 
  }

  getData(value){
    
    this.userService.getUser().subscribe(data=>{
      this.myForm.controls['name'].setValue(data.json().name);
      this.myForm.controls['email'].setValue(data.json().email);
      this.userService.getPost().subscribe(post=>{
        this.myForm.controls['post'].setValue(post.json()[0].body);
        console.log(post.json());
        });
    });
  }
}
