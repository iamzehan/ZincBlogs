interface Blogs {
  id: string;
  title: string;
  createdAt: string;
  tags: {
    tag: {
      id: string;
      tag: string;
    };
  }[];
  content: string;
  _count: {
    likes: number;
    comments: number;
  }
  author: {
    firstName: string;
    lastName: string;
  };
}


interface BlogBody {
  id: string;
  title: string;
  createdAt: string;
  tags: {
    id: string;
    tag: string;
  }[];
  likes: [];
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
}