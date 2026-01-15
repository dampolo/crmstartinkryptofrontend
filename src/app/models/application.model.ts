export interface ApplicationFormData {
  applicationNumber: string;
  /** Anrede (title) — optional */
  title?: 'Herr' | 'Frau' | 'Divers' | '';

  /** Vorname (first name) — required */
  firstName: string;

  /** Nachname (last name) — required */
  lastName: string;

  /** E-Mail-Adresse — required */
  email: string;

  /** Telefonnummer — required */
  phoneNumber: string;

  /** Lebenslauf (CV) — required, single PDF file */
  file: File;

  /** Andere Anhänge (optional PDFs) */
  file2?: File;
  file3?: File;

  /** Datenschutzerklärung Zustimmung — required */
  privacyAccepted: boolean;
}