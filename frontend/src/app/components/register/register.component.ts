import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import {Auth} from '../../shared/models/auth.model';
import {AppState} from '../../core/store/AppState'
import * as AuthActions from '../../core/store/auth/auth.action'
import { Subscription} from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean;
  formData: FormGroup;
  formData$: Subscription | undefined;

  isLoading_:boolean | any;
  isLoading$:Subscription | undefined;

  constructor(private _store: Store<AppState>,private _fb: FormBuilder) { 
    this.isSubmitted=false;
    this.isLoading$= _store.select('auth').subscribe((data:Auth) => {
      this.isLoading_ = data.isLoading;
    });
    this.formData = this._fb.group({
      first_name : ['', Validators.compose([Validators.required])],
      last_name : ['', Validators.compose([Validators.required])],
      email : ['', Validators.compose([Validators.required,  Validators.email])],
      password : ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password_confirm : ['', Validators.compose([Validators.required, Validators.minLength(5)])] 
    });
  }

  ngOnInit(): void {
    this.formData$ = this.formData.valueChanges.subscribe((data)=>{
      console.log('data',data);
   });
  }

  onSubmit(): void {
   if(this.formData.valid){
    const payload = {
      username: this.formData.value.first_name.replace(/\s+/g, "_").toLowerCase() +"_" +this.formData.value.last_name.replace(/\s+/g, "_").toLowerCase(), 
      first_name: this.formData.value.first_name, 
      last_name: this.formData.value.last_name, 
      email: this.formData.value.email, 
      password: btoa(this.formData.value.password),
      password_confirm: btoa(this.formData.value.password_confirm),
    }
    this._store.dispatch(new AuthActions.AuthRegister(payload));
   }
  }
  ngOnDestroy()	{
    if(this.formData$) {  this.formData$.unsubscribe(); }
     if(this.isLoading$) {this.isLoading$.unsubscribe();}
     console.log('destroy login component!');
   }
  
}
