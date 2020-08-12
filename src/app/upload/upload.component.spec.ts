import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ]
    })
    .compileComponents();
  }));

  it('should recieve mimeTypes', (done: DoneFn) => {
    component.getMimeTypes().subscribe((data)=>{
      expect(data.length).toBeLessThan(0);
      done();
    });
  });
  it('should recieve data', (done: DoneFn) => {
    component.requestAllData().subscribe((data)=>{
      expect(JSON.parse(data.toString()).length).toBeLessThan(0);
      done();
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
