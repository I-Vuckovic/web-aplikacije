import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule
} from "@angular/material";

const material = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
