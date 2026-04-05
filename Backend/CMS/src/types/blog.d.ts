interface Blog {
  id: string;
  title: string;
  publish: {
    status: boolean;
  };
  createdAt: Date;
}

interface BlogType {
  id: string;
  title: string;
  content: string;
  tags: { id: string; tag: string }[];
  publish: { id: string; status: boolean };
}