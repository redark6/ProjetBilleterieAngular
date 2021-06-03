/** Angular */
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/** Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LY_THEME_GLOBAL_VARIABLES,
  LyHammerGestureConfig
} from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

import { color } from '@alyle/ui/color';

export class GlobalVariables {
  testVal = color(0x00bcd4);
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: color(0xffffff),
    shadow: color(0x11998e)
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: color(0xffffff),
    shadow: color(0xB36FBC)
  };
  Amber = {
    default: color(0xffc107),
    contrast: color(0, 0, 0, 0.87)
  };
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';

import { CropperDialog } from '../cropperdialog/cropper-dialog';
import {EventFormComponent} from '../event-form.component';

@NgModule({
  bootstrap: [EventFormComponent],
  providers: [
    [LyTheme2],
    [StyleRenderer],
    {provide: LY_THEME_NAME, useValue: 'minima-light'},
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables
    }, // global variables
    // Gestures
    {provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig}
  ],
  declarations: [
    CropperDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HammerModule,
    CommonModule,
    FormsModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule
  ],
  exports: [
    //CropperWithDialogComponent
  ]
})
export class CropperWithDialogAppModule { }
