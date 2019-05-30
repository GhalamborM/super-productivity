import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { UiModule } from '../../ui/ui.module';
import { ProjectModule } from '../../features/project/project.module';
import { RouterModule } from '@angular/router';
import { BookmarkModule } from '../../features/bookmark/bookmark.module';
import { PomodoroModule } from '../../features/pomodoro/pomodoro.module';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    ProjectModule,
    RouterModule,
    BookmarkModule,
    PomodoroModule
  ],
  declarations: [MainHeaderComponent],
  exports: [MainHeaderComponent],
})
export class MainHeaderModule {
}
