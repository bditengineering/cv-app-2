import { createServerComponentClient } from "@/lib/supabase-server";

export async function fetchTitles() {
  const supabase = createServerComponentClient();
  const { data } = await supabase.from("titles").select("id, name");

  return data;
}

export async function fetchSkills() {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("skill")
    .select("id, name, skill_group(id, name, order)")
    .order("name");

  return data;
}

export async function fetchCv(employeeId: string) {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("cv")
    .select("*, projects(*), educations(*), certifications(*), cv_skill(*)")
    .eq("id", employeeId)
    .single();

  return data;
}
