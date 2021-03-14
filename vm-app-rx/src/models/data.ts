import { Observable } from 'rxjs';

export interface DataSource {
  data$: Observable<number>;
}