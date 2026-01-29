interface Blog {
  id: string;
  title: string;
  publish: {
    status: boolean;
  };
  createdAt: Date;
}