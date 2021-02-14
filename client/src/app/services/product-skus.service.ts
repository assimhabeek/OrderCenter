import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {SkusService} from './skus.service';
import {Helpers} from '../ultils/Helpers';

@Injectable({
    providedIn: 'root'
})
export class ProductSkusService {

    constructor(protected httpService: HttpService,
                protected skusService: SkusService) {
    }

    getSKUs(): Observable<any> {
        return this.skusService.getSkus().pipe(
            map((x: any) => {

                const groupedSkus = x.data.reduce((groups: any, item: any) => {
                    const group = (groups[item.skuType] || []);
                    group.push(item);
                    groups[item.skuType] = group;
                    return groups;
                }, {});

                return Object.keys(groupedSkus).reduce((groups: any, item: any) => {
                    groups[item] = this.addEmptyAndCompletedToSkus(groupedSkus[item]);
                    return groups;
                }, {});

            }));
    }

    getHeader(): Observable<any[]> {
        return this.getSKUs().pipe(
            map((skus) => {
                const bulbTypes = skus.BULB_TYPE || this.addEmptyAndCompletedToSkus([]);
                const bulbTypeFogLight = skus.BULB_TYPE_FOG_LIGHT || this.addEmptyAndCompletedToSkus([]);
                const highBeam = skus.HIGH_BEAM || this.addEmptyAndCompletedToSkus([]);
                const lowBeam = skus.LOW_BEAM || this.addEmptyAndCompletedToSkus([]);
                const fogLight = skus.FOG_LIGHT || this.addEmptyAndCompletedToSkus([]);
                const hbCanBus = skus.HB_CAN_BUS || this.addEmptyAndCompletedToSkus([]);
                const lbCanBus = skus.LB_CAN_BUS || this.addEmptyAndCompletedToSkus([]);
                return this.buildHeader(bulbTypes, bulbTypeFogLight, highBeam, lowBeam, fogLight, hbCanBus, lbCanBus);
            }));
    }

    addEmptyAndCompletedToSkus(list: any): any {
        if (list) {
            list = list.map((x: any) => x.name);
            list.unshift(Helpers.NOT_EMPTY_CHAR);
            list.unshift('');
        }
        return list || [];
    }

    buildHeader(bulbTypes: any,
                bulbTypeFogLight: any,
                highBeam: any,
                lowBeam: any,
                fogLight: any,
                hbCanBus: any,
                lbCanBus: any): any {

        return [
            {
                field: 'id',
                headerName: 'Product ID'
            },
            {
                field: 'productName',
                headerName: 'Product Name'
            },
            {
                field: 'productTitle',
                headerName: 'Product Title',
            },
            {
                field: 'bulbType',
                headerName: 'Bulb type',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: bulbTypes
                }
            },
            {
                field: 'bulbTypeFogLight',
                headerName: 'bulb Type Fog Light',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: bulbTypeFogLight
                }
            },
            {
                field: 'highBeam',
                headerName: 'High beam',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: highBeam
                }
            },
            {
                field: 'lowBeam',
                headerName: 'Low beam',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: lowBeam
                }
            },
            {
                field: 'fogLight',
                headerName: 'Fog light',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: fogLight
                }
            },
            {
                field: 'hbCanBus',
                headerName: 'Hb can bus',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: hbCanBus
                }
            },
            {
                field: 'lbCanBus',
                headerName: 'Lb can bus',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: lbCanBus
                }
            }
        ];
    }


    getProductSkus(): Observable<any> {
        return this.httpService.getWithAuth(environment.routes.productSkus);
    }


    updateCell(data: any): Promise<any> {
        return this.httpService.putWithAuth(environment.routes.productSkus, data).toPromise();
    }

}
