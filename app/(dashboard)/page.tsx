import CVList from "@/components/CVList";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("cv")
    // should this be user: users!updated_by(*) ?
    .select("*, titles(*), user: users(*)");

  return <CVList cvs={data} />;
};

export default Home;
