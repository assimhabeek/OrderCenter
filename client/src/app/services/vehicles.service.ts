import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';
import {IServerSideDatasource, IServerSideGetRowsParams} from '@ag-grid-enterprise/all-modules';
import {map} from 'rxjs/operators';
import {SkusService} from './skus.service';
import {Helpers} from '../ultils/Helpers';

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements IServerSideDatasource {

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
                const highBeam = skus.HIGH_BEAM || this.addEmptyAndCompletedToSkus([]);
                const lowBeam = skus.LOW_BEAM || this.addEmptyAndCompletedToSkus([]);
                const fogLight = skus.FOG_LIGHT || this.addEmptyAndCompletedToSkus([]);
                return this.buildHeader(highBeam, lowBeam, fogLight);
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

    buildHeader(highBeam: any,
                lowBeam: any,
                fogLight: any): any {
        console.log(highBeam);
        return [
            {
                field: 'year',
                headerName: 'Vehicle Year'
            },
            {
                field: 'make',
                headerName: 'Vehicle Make'
            },
            {
                field: 'model',
                headerName: 'Vehicle Model',
            },
            {
                field: 'highLowBeam',
                headerName: 'High and LOW beam',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: highBeam.filter((value: any) => lowBeam.includes(value))
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
            }
        ];
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

        this.httpService.getWithAuth(environment.routes.vehicles, {params: par}).subscribe(res => {
                if (res.status) {
                    params.successCallback(res.data, res.total);

                    const allColumnIds: any[] = [];
                    params.columnApi.getAllColumns().forEach((column: any) => {
                        allColumnIds.push(column.colId);
                    });
                    params.columnApi.autoSizeColumns(allColumnIds, false);

                } else {
                    params.failCallback();
                }
            },
            error => {
                params.failCallback();
            });
    }


    addRow(data: any): Observable<any> {
        return this.httpService.postWithAuth(environment.routes.vehicles, data);
    }

    updateCell(data: any): Promise<any> {
        return this.httpService.putWithAuth(environment.routes.vehicles, data).toPromise();
    }

    deleteRow(id: number): Observable<any> {
        return this.httpService.deleteWithAuth(environment.routes.vehicles + `/${id}`);
    }

    getYear(): Observable<any> {
        return this.httpService.get(environment.routes.year);
    }

    getMake(year: any): Promise<any> {
        return this.httpService.get(environment.routes.make, {params: new HttpParams().set('year', year)}).toPromise();
    }

    getModel(year: any, make: any): Promise<any> {
        return this.httpService.get(environment.routes.model,
            {
                params: new HttpParams()
                    .set('year', year)
                    .set('make', make)
            }).toPromise();
    }

}
