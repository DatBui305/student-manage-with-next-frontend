interface Enrollment {
  id: number;
  enrollment_date: Date;
  student?: {
    id: number;
    full_name: string;
    email: string;
    phone?: string;
    address?: string;
    date_of_birth: Date;
    gender: "Male" | "Female" | "Other";
    class_id?: number;
    created_at: Date;
  };
  subject?: {
    id: number;
    subject_name: string;
  };
}

export default Enrollment;
