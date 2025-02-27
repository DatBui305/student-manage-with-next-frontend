interface Student {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: "Male" | "Female";
  class_id: number;
  created_at: string;
}

export default Student;
