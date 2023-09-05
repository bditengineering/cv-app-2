import { Database } from "@/types/database.types";
import { createServerComponentClient as createServerComponentClientDefault } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function createServerComponentClient() {
  return createServerComponentClientDefault<Database>({ cookies });
}
