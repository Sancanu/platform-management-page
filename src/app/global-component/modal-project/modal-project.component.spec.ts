import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProjectComponent } from './modal-project.component';

describe('ModalProjectComponent', () => {
  let component: ModalProjectComponent;
  let fixture: ComponentFixture<ModalProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProjectComponent]
    });
    fixture = TestBed.createComponent(ModalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
