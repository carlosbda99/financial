import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedLayoutComponent } from './layout/authorized-layout/authorized-layout.component';

@NgModule({
  declarations: [AuthorizedLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthorizedLayoutComponent],
})
export class SharedModule {}
