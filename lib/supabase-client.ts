import { Database } from "@/types/database.types";
import { createClientComponentClient as createClientComponentClientDefault } from "@supabase/auth-helpers-nextjs";

export function createClientComponentClient() {
  return createClientComponentClientDefault<Database>();
}
