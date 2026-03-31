import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, QualityTestingType } from '../devices.types';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
})
export class DeviceListComponent {
  public devices: Device[] = [];
  public testingTypes: QualityTestingType[] = [QualityTestingType.Any, QualityTestingType.EddyCurrent, QualityTestingType.Ultrasound];
  public selectedTestingType: QualityTestingType = this.testingTypes[0];

  constructor(private _httpClient: HttpClient) {
    this.devices = this.getDeviceList() ?? [];
  }

  public get filteredDevices(): Device[] {
    const devices = [];

    this.devices.forEach(device => {
      if (this.selectedTestingType === 'Any'
        || device.supportedQualityTesting === QualityTestingType.Any
        || device.supportedQualityTesting === this.selectedTestingType
      ) {
        devices.push(device);
      }
    });

    return devices;
  } 

  private getDeviceList(): Observable<any> {
    const url: string = '/backendapi/device';

    return this._httpClient.get(url);
  }
}