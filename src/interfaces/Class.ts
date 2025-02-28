interface Class {
  id: number;
  class_name: string;
  teacher?: {
    id: number;
    full_name?: string;
    email?: string;
    phone?: string;
  };
}

export default Class;
