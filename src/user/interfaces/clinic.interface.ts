export default interface ClinicInterface {
    _id?: string;
    clinicName: string;
    telephone: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    country: string
    location?: LocationInterface
}

interface LocationInterface {
    longitude: string;
    latitude: string;
    geohash: string;
}