export const ServiceTypes = [
  "Acompte",
  "Heures",
  "Jours",
  "Produit",
  "Service",
] as const;

export const ConditionsReglement = [
  "30 jours fin de mois",
  "45 jours",
  "45 jours fin de mois",
  "60 jours",
  "60 jours fin de mois",
  "90 jours",
] as const;

export const ModeReglement = [
  "Virement bancaire",
  "Carte bancaire",
  "Paypal",
] as const;

export const InvoiceType = ["INVOICE", "CREDIT_NOTE"] as const;

export const InvoiceStatus = [
  "DRAFT",
  "CANCELED",
  "VALIDATED",
  "PAYED",
] as const;

export const VatRates = [20, 10, 5.5, 2.1];

export type ConditionsReglementType =
  | "30 jours fin de mois"
  | "45 jours"
  | "45 jours fin de mois"
  | "60 jours"
  | "60 jours fin de mois"
  | "90 jours";

export type ModeReglementType =
  | "Virement bancaire"
  | "Carte bancaire"
  | "Paypal";

export type ServiceType =
  | "Acompte"
  | "Heures"
  | "Jours"
  | "Produit"
  | "Service";
