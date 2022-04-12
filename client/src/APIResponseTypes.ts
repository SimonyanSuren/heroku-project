export interface Ipost {
  userId: number;
  id: number;
  body: string;
  title: string;
  uuid: TemplateStringsArray
}

export interface Icomment {
  postId: number;
  id: number;
  body: string;
  userId: number;
}

export interface Iuser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export type List = Ipost | Icomment;
