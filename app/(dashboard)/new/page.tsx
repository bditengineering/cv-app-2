import CVForm from "@/components/CVForm";
import { transformSkills } from "@/helpers";
import { createServerComponentClient } from "@/lib/supabase-server";

async function fetchTitles() {
  const supabase = createServerComponentClient();
  const { data } = await supabase.from("titles").select("id, name");

  return data;
}

async function fetchSkills() {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("skill")
    .select("id, name, skill_group(id, name, order)")
    .order("name");

  return data;
}

const NewCvPage = async () => {
  const titles = await fetchTitles();
  const skills = await fetchSkills();

  return <CVForm titles={titles || []} skills={transformSkills(skills)} />;
};

export default NewCvPage;
