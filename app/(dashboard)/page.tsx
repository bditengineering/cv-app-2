import CVList from "@/components/CVList";
import { createServerComponentClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const Home = async () => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("cv")
    // should this be user: users!updated_by(*) ?
    .select("*, titles(*), user: users(*)");

  return <CVList cvs={data} />;
};

export default Home;
