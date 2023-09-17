import { NgModule } from '@angular/core';
//Pipes
import { SafeHtmlPipe } from './safeHtmlPipe/safe-html.pipe';

@NgModule({
    declarations: [
        SafeHtmlPipe,
    ],
    exports: [
        SafeHtmlPipe,
    ]
})
export class SharedPipesModule { }