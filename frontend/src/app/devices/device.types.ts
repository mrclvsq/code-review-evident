export enum ConnectorEnum {
  Universal = 'Universal',
  BNC = 'BNC',
  C16P = 'C16P',
}

export enum QualityTestingType {
  Any = 'Any',
  Ultrasound = 'Ultrasound',
  EddyCurrent = 'EddyCurrent',
}

export interface DeviceConnector {
  id: number;
  type: ConnectorEnum;
}

export interface Device {
  name?: string;
  serial: string;
  purchaseDate: string;
  connectors: DeviceConnector[];
  supportedQualityTesting: QualityTestingType;
}