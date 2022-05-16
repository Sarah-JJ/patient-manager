import {Address} from "./address";
import {Name} from "./name";
import {Identifier} from "./identifier";
import {Meta} from "./meta";

export interface Patient {
  resourceType: string,
  id: string,
  meta: Meta,
  identifier: Array<Identifier>,
  active: boolean,
  name: Array<Name>,
  gender: string,
  birthDate: string,
  address: Array<Address>
}
