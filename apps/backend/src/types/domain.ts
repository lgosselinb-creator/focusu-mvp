export type Course = {
  id: string;
  userId: string;
  name: string;
  code: string;
  credits: number;
  professor: string;
  color: string;
  folderName: string;
  summary?: string;
};

export type CalendarEvent = {
  id: string;
  userId: string;
  courseId?: string;
  title: string;
  type: "class" | "study" | "exam" | "personal";
  startsAt: string;
  endsAt: string;
  recurrence?: "none" | "weekly";
};

export type GradeItem = {
  id: string;
  courseId: string;
  name: string;
  weight: number;
  score?: number;
  dueDate?: string;
  isFinal?: boolean;
};
