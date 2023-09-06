import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

// supabase query helpers
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;

export type CV = Tables<"cv">;
export type CVSKill = Tables<"cv_skill">;
export type Education = Tables<"educations">;
export type Project = Tables<"projects">;
export type Certification = Tables<"certifications">;
export type Title = Tables<"titles">;
export type User = Tables<"users">;

export type CVWithTitlesAndUser = CV & {
  titles: Title | null;
  user: User | null;
};

export type CVDetails = Partial<CV> & {
  educations: Education[];
  projects: Project[];
  certifications: Certification[];
  cv_skill: CVSKill[];
};

export type UserTitle = Pick<Title, "id" | "name">;
