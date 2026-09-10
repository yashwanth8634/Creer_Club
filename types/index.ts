export interface GalleryImage {
  url: string;
  key: string;
}

export interface IEventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  registrationEndDate: string;
  venue: string;
  fee: number;
  coverImage?: string;
  upiQrCode?: string;
  galleryImages: GalleryImage[];
  status: "upcoming" | "past";
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegistrationItem {
  _id: string;
  name: string;
  phone: string;
  email: string;
  transactionId: string;
  screenshotUrl?: string;
  screenshotKey?: string;
  status: "pending" | "verified" | "rejected";
  rejectionReason?: string | null;
  createdAt: string;
  eventId: {
    _id: string;
    title: string;
    date: string;
  };
}
