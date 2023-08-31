import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalImgComponent } from './post-modal-img.component';

describe('PostModalImgComponent', () => {
  let component: PostModalImgComponent;
  let fixture: ComponentFixture<PostModalImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostModalImgComponent],
    });
    fixture = TestBed.createComponent(PostModalImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
