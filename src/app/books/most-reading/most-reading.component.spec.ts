import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MostReadingComponent} from './most-reading.component';

describe('MostReadingComponent', () => {
    let component: MostReadingComponent;
    let fixture: ComponentFixture<MostReadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MostReadingComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MostReadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
