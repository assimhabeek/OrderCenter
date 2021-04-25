import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VehiclesService} from '../../services/vehicles.service';
import {HttpResponse} from '@angular/common/http';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
    selector: 'ct-vehicle-export',
    templateUrl: './vehicles-export.component.html',
    styleUrls: ['./vehicles-export.component.scss']
})
export class VehiclesExportComponent implements OnInit {

    public listingFilter: FormGroup = new FormGroup({
        highBeam: new FormControl(),
        lowBeam: new FormControl()
    })

    highBeams!: { name: string, value: string }[];
    lowBeams!: { name: string, value: string }[];

    constructor(public vehiclesService: VehiclesService) {

    }


    ngOnInit(): void {
        this.vehiclesService.getSKUs().subscribe((skus) => {
            this.highBeams = skus['HIGH_BEAM'].slice(2).map(this.createOption);
            this.lowBeams = skus['LOW_BEAM'].slice(2).map(this.createOption);
        });
    }

    createOption = (x: string) => ({
        name: x.replace('CAR_HL_', ''),
        value: x
    });

    exportListing() {
        const formValue = this.listingFilter.value;
        const filters: any = Object
            .keys(formValue)
            .filter(x => formValue[x] !== null)
            .map(x => ({name: x, value: formValue[x]}));
        this.vehiclesService.exportFile(filters).subscribe((res: HttpResponse<any>) => {
            this.saveAsExcelFile(res.body, res.headers.get('x-file-name') || '');
        });

    }

    clear() {
        this.listingFilter.reset();
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        this.save(data, fileName);
    }

    save(content: Blob, filename: string): void {
        const element = document.createElement('a');
        element.setAttribute('href', (window.webkitURL || window.URL).createObjectURL(content));
        element.setAttribute('download', filename);
        element.dataset.downloadurl = ['text/plain', element.download, element.href].join(':');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}
