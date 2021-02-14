import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[ctDnd]'
})
export class DndDirective {

  @HostBinding('class.fileOver') fileOver = false;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver($evt: any): void {
    $evt.preventDefault();
    $evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave($evt: any): void {
    $evt.preventDefault();
    $evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  public ondrop($evt: any): void {
    $evt.preventDefault();
    $evt.stopPropagation();
    this.fileOver = false;
    this.fileDropped.emit($evt.dataTransfer);
  }
}
