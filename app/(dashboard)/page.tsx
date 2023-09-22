import { createServerComponentClient } from "@/lib/supabase-server";
import { columns } from "@/app/(dashboard)/columns";
import { DataTable } from "@/app/(dashboard)/data-table";

export const dynamic = "force-dynamic";

const Home = async () => {
  const supabase = createServerComponentClient();

  const { data } = await supabase
    .from("cv")
    // should this be user: users!updated_by(*) ?
    .select("*, titles(*), user: users(*)");

  return <DataTable columns={columns} data={data || []} />;
};

export default Home;
