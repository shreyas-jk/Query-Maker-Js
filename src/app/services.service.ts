import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiUrl;

export interface TableColumns{
  COLUMN_NAME : string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpClient) { }

  PostTable(data1: any, data2: any, joinTable: any, tabname1: any, tabname2: any, joinType: any): Observable<string> {
    var body = new HttpParams()
            .set('Table1', data1)
            .set('Table2', data2)
            .set('JoinTable', joinTable)
            .set('JoinType', joinType)
            .set('TableName1', tabname1.name)
            .set('TableName2', tabname2.name);

    var headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');

    return this._http.post<string>(`${apiUrl}${'api/PostData'}`,
    body.toString(), { headers });
  }

  ExecuteSql(sql:string,sv: string, db: string, usr: string, pwd: string)
  {
    var body = new HttpParams()
    .set('dataSql', sql);

    var headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');

    return this._http.post<string>(`${apiUrl}${'api/PostExecute?sv='+sv+'&db='+db+'&usr='+usr+'&pwd='+pwd}`, body.toString(), { headers });
  }

  SchemaFormations(sv: string, db: string, usr: string, pwd: string, tblnm: string): Observable<TableColumns> {
    var headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');
    return this._http.post<TableColumns>(`${apiUrl}${'api/GetColumnNames?sv='+sv+'&db='+db+'&usr='+usr+'&pwd='+pwd+'&tblnm='+tblnm}`, null,{ headers });
  }
}
