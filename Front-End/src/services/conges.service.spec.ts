import { TestBed, inject } from '@angular/core/testing';

import { CongesService } from './conges.service';

describe('CongesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongesService]
    });
  });

  it('should be created', inject([CongesService], (service: CongesService) => {
    expect(service).toBeTruthy();
  }));
});
