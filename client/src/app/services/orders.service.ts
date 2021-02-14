import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';
import {IServerSideDatasource, IServerSideGetRowsParams} from '@ag-grid-enterprise/all-modules';
import {SkusService} from './skus.service';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {Helpers} from '../ultils/Helpers';
import {VehiclesService} from './vehicles.service';

@Injectable({
    providedIn: 'root'
})
export class OrdersService implements IServerSideDatasource {

    constructor(protected httpService: HttpService,
                protected skusService: SkusService,
                protected vehiclesService: VehiclesService) {
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
        return forkJoin(
            [
                this.getSKUs(),
                this.vehiclesService.getYear()
            ])
            .pipe(map(([skus, years]) => {
                const bulbTypes = skus.BULB_TYPE || this.addEmptyAndCompletedToSkus([]);
                const bulbTypeFogLight = skus.BULB_TYPE_FOG_LIGHT || this.addEmptyAndCompletedToSkus([]);;
                const highBeam = skus.HIGH_BEAM || this.addEmptyAndCompletedToSkus([]);
                const lowBeam = skus.LOW_BEAM || this.addEmptyAndCompletedToSkus([]);
                const fogLight = skus.FOG_LIGHT || this.addEmptyAndCompletedToSkus([]);
                const hbCanBus = skus.HB_CAN_BUS || this.addEmptyAndCompletedToSkus([]);
                const lbCanBus = skus.LB_CAN_BUS || this.addEmptyAndCompletedToSkus([]);
                return this.buildHeader(bulbTypes, bulbTypeFogLight, highBeam, lowBeam, fogLight, hbCanBus, lbCanBus, years);
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
                lbCanBus: any,
                years: any): any {
        return [
            {
                field: 'orderStatus',
                pinned: 'left',
                hide: true,
                filter: 'agNumberColumnFilter',
                headerName: ' '
            },
            {
                field: 'orderNo',
                pinned: 'left',
                headerName: 'Order No',
            },
            {
                field: 'lastModification',
                headerName: 'Last modification',
                tooltipField: 'lastModification',
                valueSetter: (params: any) => {
                    params.data.lastModification = params.newValue;
                    return true;
                },
                cellRenderer: (col: any) => {
                    return Helpers.fromMysqlDateTime(col.value).fromNow();
                },
                cellStyle: {'background-color': 'rgba(60,60,60,0.3)'},
                editable: false,
                filter: false
            },
            {
                field: 'quantity',
                headerName: 'Quantity',
                type: 'numericColumn',
            },
            {
                field: 'productName',
                headerName: 'Product name'
            },
            {
                field: 'productTitle',
                headerName: 'Product title'
            },
            {
                field: 'bulbType',
                headerName: 'Bulb type',
                width: 100,
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: bulbTypes
                }
            },
            {
                field: 'bulbTypeFogLight',
                headerName: 'bulb Type Fog Light',
                width: 100,
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: bulbTypeFogLight
                }
            },
            {
                field: 'highBeam',
                headerName: 'High beam',
                width: 100,
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: highBeam
                }
            },
            {
                field: 'lowBeam',
                headerName: 'Low beam',
                cellEditor: 'selectEditor',
                width: 100,
                cellEditorParams: {
                    elements: lowBeam
                }
            },
            {
                field: 'fogLight',
                headerName: 'Fog light',
                cellEditor: 'selectEditor',
                width: 100,
                cellEditorParams: {
                    elements: fogLight
                }
            },
            {
                field: 'hbCanBus',
                headerName: 'Hb can bus',
                width: 100,
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: hbCanBus
                }
            },
            {
                field: 'lbCanBus',
                headerName: 'Lb can bus',
                width: 100,
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: lbCanBus
                }
            },
            {
                field: 'orderNotes',
                headerName: 'Order notes',
            },
            {
                field: 'additionalDetails',
                headerName: 'Additional details',
            },
            {
                field: 'shippingName',
                headerName: 'Shipping name',

            },
            {
                field: 'shippingAddress1',
                headerName: 'Shipping address1'
            },
            {
                field: 'address2',
                headerName: 'Address2',
            },
            {
                field: 'shippingCity',
                headerName: 'Shipping city',

            },
            {
                field: 'shippingZip',
                headerName: 'Shipping zip',

            },
            {
                field: 'shippingProvince',
                headerName: 'Shipping province',

            },
            {
                field: 'shippingCountryCode',
                headerName: 'Shipping country code',

            },
            {
                field: 'shippingCountry',
                headerName: 'Shipping country',

            },
            {
                field: 'shippingPhone',
                headerName: 'Shipping phone',

            },
            {
                field: 'shippingCompany',
                headerName: 'Shipping company',

            },
            {
                field: 'orderDate',
                headerName: 'Order date',
                cellStyle: {'background-color': 'rgba(60,60,60,0.3)'},
                editable: false,
            },
            {
                field: 'modifiedBy',
                cellStyle: {'background-color': 'rgba(60,60,60,0.3)'},
                headerName: 'Modified by',
                editable: false
            },
            {
                field: 'completed',
                hide: true
            }
        ];
    }

    getQueueOrders(ordersStatus: number): Observable<any> {
        const filter = JSON.stringify([
            {name: 'completed', value: 'completed'},
            {name: 'orderStatus', value: ordersStatus}
        ]);
        return this.httpService.getWithAuth(environment.routes.orders, {params: new HttpParams().set('filter', filter)});
    }


    getRows(params: IServerSideGetRowsParams): void {
        const filterParams = Object.keys(params.request.filterModel).map(x => {
            return {name: x, value: params.request.filterModel[x].filter};
        });


        const filter = JSON.stringify(filterParams);

        const par = new HttpParams()
            .set('start', params.request.startRow.toString())
            .set('end', params.request.endRow.toString())
            .set('filter', filter)
            .set('sortBy', params.request.sortModel[0] ? params.request.sortModel[0].colId : '')
            .set('sortDirection', params.request.sortModel[0] ? params.request.sortModel[0].sort : '');

        this.httpService.getWithAuth(environment.routes.orders, {params: par}).subscribe(res => {
                if (res.status === true) {
                    params.successCallback(res.data, res.total);

                    const allColumnIds: any[] = params.columnApi.getAllColumns()
                        .filter((x: any) => !x.colDef.width)
                        .map((x: any) => x.colId);
                    params.columnApi.autoSizeColumns(allColumnIds, true);

                } else {
                    params.failCallback();
                }
            },
            error => {
                params.failCallback();
            });
    }

    addRow(data: any): Observable<any> {
        return this.httpService.postWithAuth(environment.routes.orders, data);
    }

    addAll(data: any): Observable<any> {
        return this.httpService.postWithAuth(environment.routes.ordersAll, data);
    }

    updateCell(data: any): Promise<any> {
        return this.httpService.putWithAuth(environment.routes.orders, data).toPromise();
    }

    queueAll(data: any): Observable<any> {
        return this.httpService.putWithAuth(environment.routes.ordersQueueAll, data);
    }

    deleteRow(id: number): Observable<any> {
        return this.httpService.deleteWithAuth(environment.routes.orders + `/${id}`);
    }

    loadOrdersByRange(startDate: any, endDate: any, type: string): Observable<any> {
        const par = new HttpParams()
            .set('start', startDate)
            .set('end', endDate)
            .set('type', type);
        return this.httpService.getWithAuth(environment.routes.ordersQueuedRange, {params: par});
    }

    exportOrders(data: any): Observable<any> {
        return this.httpService.postWithAuth(environment.routes.exportOrders, data, {
            responseType: 'blob',
            observe: 'response'
        });
    }
}
