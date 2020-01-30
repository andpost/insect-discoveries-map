import { Impressum } from '../app/impressum';
import impressum from '../assets/impressum_prod.json';

const  impressumList: Impressum = impressum;

export const environment = {
    production: true,
    impressumName: impressumList.name,
    impressumStreet: impressumList.street,
    impressumPostalcode: impressumList.postalcode,
    impressumCity: impressumList.city,
    impressumTelephone: impressumList.telephone,
    impressumEmail: impressumList.email,
  }
;
