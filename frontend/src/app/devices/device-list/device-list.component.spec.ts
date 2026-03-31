import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { Device, QualityTestingType } from '../devices.types';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter devices correctly', ()=>{
    component.selectedTestingType = QualityTestingType.EddyCurrent;

    const mockDevices: Device[] = [
      {
        supportedQualityTesting: QualityTestingType.EddyCurrent
      },
      {
        supportedQualityTesting: QualityTestingType.Any
      },
      {
        supportedQualityTesting: null
      }
    ] as Device[];

    component.devices = mockDevices;

    const filteredDevices = component.filteredDevices;
    expect(filteredDevices.length).toBe(4);
  });
});