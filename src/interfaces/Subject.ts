interface Subject {
  id: number;
  subject_name: string;
  teacher?: {
    id: number;
    full_name?: string;
    email?: string;
    phone?: string;
  };
  class?: {
    id: number;
    class_name: string;
  };
}

export default Subject;
