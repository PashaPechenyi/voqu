export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum LessonType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  READING = 'reading',
  LISTENING = 'listening',
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  auth0Id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  type: LessonType;
  schema: Record<string, unknown>;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description?: string;
  level: Level;
  order: number;
  content: Record<string, unknown>;
  isPublished: boolean;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
