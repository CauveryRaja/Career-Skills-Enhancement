import { TestBed, inject } from '@angular/core/testing';

import { ImgserviceService } from './imgservice.service';

describe('ImgserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgserviceService]
    });
  });

  it('should be created', inject([ImgserviceService], (service: ImgserviceService) => {
    expect(service).toBeTruthy();
  }));
});
