import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
