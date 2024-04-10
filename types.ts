export type Person = {
  _id: string;
  name: string;
  age: number;
  sex: string;
  description: string;
  hobbies: string[] | string;
  photo: string;
  comments: Comments[];
};

type Comments = {
  user: string;
  message: string;
};
