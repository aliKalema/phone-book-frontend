import {FileHandle} from "./file-handle";
import {Country} from "./country";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  otherNames?: string;
  phone: string;
  email: string;
  image?: string;
  imageUrl?: string;
  countryId: number;
  country?: Country;
}
