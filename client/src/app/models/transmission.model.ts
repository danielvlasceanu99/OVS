export interface Transmission {
    id: number;
    transmissionType: TransmissionType;
    numberOfGears: number;
}

export enum TransmissionType {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
  DUALCLUTCH = "DUALCLUTCH",
}