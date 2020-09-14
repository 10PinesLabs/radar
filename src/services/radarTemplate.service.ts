import {RadarTemplate} from '../model/radarTemplate';
import {Observable} from 'rxjs/index';

export interface RadarTemplateService {

  getAll(): Observable<Array<RadarTemplate>>;

  get(id): Observable<RadarTemplate>

}
