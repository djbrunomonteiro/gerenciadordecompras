import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasEditorComponent } from './compras-editor.component';

describe('ComprasEditorComponent', () => {
  let component: ComprasEditorComponent;
  let fixture: ComponentFixture<ComprasEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
