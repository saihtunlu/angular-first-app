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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      email : ['', Validators.compose([Validators.required,  Validators.email])],
      password : ['', Validators.compose([Validators.required, Validators.minLength(5)])] 
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
      email: this.formData.value.email, 
      password: btoa(this.formData.value.password)
    }
    this.isSubmitted = true;
    this._store.dispatch(new AuthActions.AuthLogin(payload));
   }
  }
  ngOnDestroy()	{
    if(this.formData$) {  this.formData$.unsubscribe(); }
     if(this.isLoading$) {this.isLoading$.unsubscribe();}
     console.log('destroy login component!');
   }
  
}
