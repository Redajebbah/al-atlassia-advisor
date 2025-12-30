export type Language = 'ar' | 'fr';

export type InsuranceType =
  | 'automobile'
  | 'habitation'
  | 'sante'
  | 'vie'
  | 'entreprises'
  | 'professionnels'
  | 'scolaire'
  | 'autres'
  | 'transport_public'
  | 'renouvellement';

export type VehicleType =
  | 'voiture'
  | 'camion'
  | 'moto'
  | 'trottinette'
  | 'triporteur'
  | 'tracteur'
  | 'pickup'
  | 'camion_petit'
  | 'camion_grand';

export type HousingType = 'maison' | 'appartement' | 'villa';
export type HousingStatus = 'proprietaire' | 'locataire';
export type HealthCoverage = 'individuel' | 'famille';
export type CurrentInsuranceType = 'base' | 'complementaire' | 'base_complementaire';
export type ContactMethod = 'bureau' | 'appel';
export type ContactPreference = 'whatsapp' | 'appel';

export interface ClientInfo {
  fullName: string;
  phone: string;
  city: string;
  contactPreference: ContactPreference;
  preferredDay: string;
  preferredHour: string;
}

export interface AutomobileData {
  vehicleType: VehicleType;
  registrationNumber?: string;
}

export interface HabitationData {
  housingType: HousingType;
  status: HousingStatus;
  value: string;
  furnitureValue?: string;
}

export interface SanteData {
  coverage: HealthCoverage;
  age?: string; // For individual coverage
  familyMembersCount?: number; // For family coverage
  familyMembersAges?: string[]; // Array of ages for family members
  hasCurrentInsurance: boolean;
  currentInsuranceType?: CurrentInsuranceType;
}

export interface VieData {
  contactMethod: ContactMethod;
}

export interface EntreprisesData {
  activityType: string;
  insuranceTypes: string[];
}

export interface ProfessionnelsData {
  professionType?: string;
  insuranceTypes: string[];
}

export interface ScolaireData {
  coverageTypes: string[];
  institutionName: string;
}

export interface TransportPublicData {
  transportMeans: string;
}

export type InsuranceData =
  | { type: 'automobile'; data: AutomobileData }
  | { type: 'habitation'; data: HabitationData }
  | { type: 'sante'; data: SanteData }
  | { type: 'vie'; data: VieData }
  | { type: 'entreprises'; data: EntreprisesData }
  | { type: 'professionnels'; data: ProfessionnelsData }
  | { type: 'scolaire'; data: ScolaireData }
  | { type: 'autres'; data: null }
  | { type: 'transport_public'; data: TransportPublicData };

export type ChatStep =
  | 'welcome'
  | 'select_insurance'
  | 'automobile_vehicle'
  | 'automobile_registration'
  | 'habitation_type'
  | 'habitation_status'
  | 'habitation_value'
  | 'habitation_furniture_value'
  | 'sante_coverage'
  | 'sante_age'
  | 'sante_spouse_count'
  | 'sante_children_count'
  | 'sante_family_member_ages'
  | 'sante_family_count'
  | 'sante_family_ages'
  | 'sante_current'
  | 'sante_current_type'
  | 'vie_contact'
  | 'entreprises_activity'
  | 'entreprises_types'
  | 'professionnels_types'
  | 'professionnels_profession_type'
  | 'scolaire_coverage'
  | 'scolaire_institution'
  | 'autres_need'
  | 'transport_means'
  | 'client_name'
  | 'client_phone'
  | 'client_city'
  | 'client_contact_preference'
  | 'client_day'
  | 'client_hour'
  | 'confirmation'
  | 'vie_bureau';

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: ChatOption[];
  multiSelect?: boolean;
  inputType?: 'text' | 'phone' | 'number' | 'registration';
  inputPlaceholder?: string;
}

export interface ChatOption {
  id: string;
  label: string;
  icon?: string;
}

export interface ChatState {
  language: Language | null;
  step: ChatStep;
  selectedInsurance: InsuranceType | null;
  insuranceData: Partial<InsuranceData['data']>;
  clientInfo: Partial<ClientInfo>;
  messages: ChatMessage[];
}
