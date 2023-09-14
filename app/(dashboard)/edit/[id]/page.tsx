import { fetchCv, fetchSkills, fetchTitles } from "@/api/server";
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

  if (!cv) {
    throw new Error("There was an error fetching the CV");
  }

  return (
    <CVForm
      titles={titles || []}
      skills={transformSkills(skills)}
      cv={cv}
      initialUserSkills={initialUserSkills}
    />
  );
};

export default EditCvPage;
