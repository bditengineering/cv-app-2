import { fetchCv, fetchSkills, fetchTitles } from "@/api/server";
import { createServerComponentClient } from "@/lib/supabase-server";
import CVForm from "@/components/CVForm";
import { transformSkills } from "@/helpers";

interface EditCvPageProps {
  params: {
    id: string;
  };
}

const EditCvPage = async ({ params: { id } }: EditCvPageProps) => {
  const skills = await fetchSkills();
  const titles = (await fetchTitles()) || [];
  const cv = await fetchCv(id);
  const initialUserSkills = cv?.cv_skill || [];
  const supabase = createServerComponentClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  const { data } = await supabase
    .from("admins")
    .select("id")
    .filter("user_id", "eq", userId);

  const isAdmin = data?.length && data.length > 0 ? true : false;

  if (!cv) {
    throw new Error("There was an error fetching the CV");
  }

  return (
    <CVForm
      titles={titles || []}
      skills={transformSkills(skills)}
      cv={cv}
      initialUserSkills={initialUserSkills}
      isAdmin={isAdmin}
    />
  );
};

export default EditCvPage;
