export interface INews {
  data: {
    id: number;
    title: string;
    description: string;
    category: string;
    author: string;
    favorite: boolean;
  }[];
  pages: number;
  items: number;
}
