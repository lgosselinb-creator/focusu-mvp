export type Course = {
  id: string;
  name: string;
  code: string;
  credits: number;
  professor: string;
  color: string;
  summary: string;
};

export type GradeItem = {
  id: string;
  courseId: string;
  name: string;
  weight: number;
  score?: number;
  isFinal?: boolean;
};

export type CalendarEvent = {
  id: string;
  courseId?: string;
  title: string;
  type: "class" | "study" | "exam" | "personal";
  startsAt: string;
  endsAt: string;
};
