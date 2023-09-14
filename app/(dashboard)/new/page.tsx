import { fetchSkills, fetchTitles } from "@/api/server";
import CVForm from "@/components/CVForm";
import { transformSkills } from "@/helpers";

const NewCvPage = async () => {
  const titles = await fetchTitles();
  const skills = await fetchSkills();

  return <CVForm titles={titles || []} skills={transformSkills(skills)} />;
};

export default NewCvPage;
