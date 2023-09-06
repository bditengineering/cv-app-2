import CVForm from "@/components/CVForm";
import { createServerComponentClient } from "@/lib/supabase-server";

async function fetchTitles() {
  const supabase = createServerComponentClient();
  const { data } = await supabase.from("titles").select("id, name");

  return data;
}

const NewCvPage = async () => {
  const titles = await fetchTitles();
  return <CVForm titles={titles || []} />;
};

export default NewCvPage;
