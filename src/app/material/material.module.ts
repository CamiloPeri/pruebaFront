import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//#region  componentes material UI
import { MatSliderModule } from '@angular/material/slider';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';

//#endregion
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatTreeModule,
    DragDropModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSortModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTooltipModule,
    CdkAccordionModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatSlideToggleModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    DragDropModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSortModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTooltipModule,
    CdkAccordionModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSlideToggleModule,
    ScrollingModule,
  ],
})
export class MaterialModule {}
