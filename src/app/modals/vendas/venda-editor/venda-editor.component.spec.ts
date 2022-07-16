import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaEditorComponent } from './venda-editor.component';

describe('VendaEditorComponent', () => {
  let component: VendaEditorComponent;
  let fixture: ComponentFixture<VendaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
