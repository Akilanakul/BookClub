export type Member = {
    id: number;
    username: string;
  }
  
  export type BookClub = {
    id: number;
    name: string;
    description: string;
    members: Member[];
  }

  export type Book = {
    id : number;
    title: string;
    author: string;
    genre: string;
    coverage_image: string;
    readingList: string;
  }
  