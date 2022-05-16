import {Patient} from "./patient";

export interface Patients {
  resourceType: string,
  type: string,
  entry: Array<{resource: Patient}>
}
