import { Observable } from 'rxjs';

import { DataSource } from '../models/data';
import { initDataSource } from '../utils/dataSourceUtils';

class ResourceService {
  private readonly registry = new Map<string, DataSource>();

  private getDataSource(key: string): DataSource {
    if (!this.registry.has(key)) {
      const dataSource = initDataSource();
      this.registry.set(key, dataSource);
    }

    return this.registry.get(key) as DataSource;
  }

  getData(key: string) {
    const dataSource = this.getDataSource(key);

    return new Observable<number>(observer => {
      const data$$ = dataSource.data$.subscribe(data => {
        observer.next(data);
      });

      return () => {
        console.warn('observer unsubscribed...')
        data$$.unsubscribe();
      }
    });
  }
}

export default new ResourceService();