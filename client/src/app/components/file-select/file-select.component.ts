import {Component} from '@angular/core';
import {FileUploaderService} from '../../services/file-uploader.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'ct-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent {


  uploadedFileName = null;
  progressBarValue = 0;
  currentFile = null;

  constructor(public fileUploaderService: FileUploaderService,
              public alertService: AlertService) {
  }


  importFile($event: any): void {
    if ($event.files.length > 0 && $event.files[0] != null && this.isValidFileType($event.files[0])) {
      this.uploadedFileName = $event.files[0].name;
      this.currentFile = $event.files[0];
    } else {
      this.onError('Invalid File');
    }
  }

  uploadFile() {
    this.fileUploaderService.upload(this.currentFile)
      .subscribe(this.handleResponse.bind(this), error => {
        console.log(error);
        this.onError('Could not upload the file');
      });
  }

  onChoseFile($file: any) {
    $file.click();
    this.currentFile = null;
    this.progressBarValue = 0;
    this.uploadedFileName = null;
  }

  handleResponse(x: any) {
    if (x.status) {
      this.progressBarValue = 100;
      this.onSuccess(x.message);
    } else {
      this.onError(x.message);
    }
  }

  getFileExtension(name: string): any {
    return name.split('.').pop();
  }

  isValidFileType(file: File): boolean {
    return ['xlsx', 'xls', 'csv'].includes(this.getFileExtension(file.name));
  }

  onSuccess(message: string) {
    this.alertService.alertSuccess(message);
  }


  onError(error: string): void {
    this.alertService.alertError(error);
  }


}
