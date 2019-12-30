import { TestBed, inject } from '@angular/core/testing';

import { MessagerieService } from './messagerie.service';

describe('MessagerieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagerieService]
    });
  });

  it('should be created', inject([MessagerieService], (service: MessagerieService) => {
    expect(service).toBeTruthy();
  }));
});
