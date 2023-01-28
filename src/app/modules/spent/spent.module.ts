import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpentRoutingModule } from './spent-routing.module';
import { SpentComponent } from './pages';

@NgModule({
  declarations: [SpentComponent],
  imports: [CommonModule, SpentRoutingModule],
})
export class SpentModule {}
