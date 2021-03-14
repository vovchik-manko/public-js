import { interval } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

import { DataSource } from '../models/data';
import { STREAM_RESPONSE_DELAY } from '../constants/data';


export function initDataSource(): DataSource {
  return {
    data$: interval(STREAM_RESPONSE_DELAY).pipe(
      finalize(() => {
        console.warn('Stream is unsubscribed...')
      }),
      shareReplay({bufferSize: 1, refCount: true}),
    )
  };
}