
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  lastLogin: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  carbonFootprint: number;
  monthlyCost: number;
  efficiencyScore: number;
}

export interface CarbonData {
  carbonFootprint: number;
  monthlyCost: number;
  efficiencyScore: number;
  potentialSavings: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AIRecommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  savings: number;
}

export interface AppState {
  isLoggedIn: boolean;
  role: UserRole | null;
  user: User | null;
  companyId?: string;
}
