import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpentRoutingModule } from './spent-routing.module';
import { SpentComponent } from './pages';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SpentComponent],
  imports: [CommonModule, SpentRoutingModule, SharedModule],
})
export class SpentModule {}
