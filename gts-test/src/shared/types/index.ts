export interface Orders {
  id: string
  date: string;
  priority: number;
  equipment: string;
  message: string;
  responsible: string;
  avatar?: string
  status: number
}