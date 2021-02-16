import { TestBed } from '@angular/core/testing';

import { EditorFactoryService } from './editor-factory.service';

describe('EditorFactoryService', () => {
  let service: EditorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
