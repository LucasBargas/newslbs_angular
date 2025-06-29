export interface Order {
  id?: number;
  name: string;
  code: 'asc' | 'desc' | 'aleat';
}
