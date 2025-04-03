export interface Event {
  id?: number;
  title: string;
  details: string;
  date: string | Date; // Représente une date (format ISO ou objet Date)
  begin_date: string | Date; // Date de début
  end_date: string | Date; // Date de fin
  address: string;
  city: string;
  schoolType?: string; // Optionnel
  totalChildren?: number; // Optionnel
  carpooling: boolean; // Covoiturage nécessaire
  needLunch: boolean; // Déjeuner nécessaire
  nbVolunteers: number; // Nombre de bénévoles
  idType: number; // ID du type d'événement
  idUser: number; // ID de l'utilisateur associé
  idPublic: number; // ID du public cible
  idTheme: number; // ID du thème
  idSchoolLevel?: number; // Niveau scolaire (optionnel)
}