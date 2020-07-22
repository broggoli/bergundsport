import { VeranstaltungData } from './veranstaltungData';

export interface MailData {
    event: VeranstaltungData;
    PLZ: number
    address: string
    bemerkung: string
    email: string
    firstName: string
    lastName: string
    mobile: number
    place: string
    tel: number
    alpenClubMember: boolean
    vegi: boolean
}
