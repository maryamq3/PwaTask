import { TestBed } from '@angular/core/testing';

import { ChkNet } from './chk-net';

describe('ChkNet', () => {
  let service: ChkNet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChkNet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
