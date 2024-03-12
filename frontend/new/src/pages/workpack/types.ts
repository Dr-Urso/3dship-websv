export interface Nodes {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  days_required: string;
  description: string;
}

export interface Edges {
  id: number;
  source: number;
  target: number;
}
