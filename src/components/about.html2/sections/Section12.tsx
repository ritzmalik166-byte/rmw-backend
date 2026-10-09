import { get_latest_3_blogs } from "@/app/api/get_all_blogs/[slug]/route";
import Section3 from "@/components/blogs/inner/sections/Section3";

export default async function Section12() {
  const res = await get_latest_3_blogs();
  const blogs =
    res?.status === 200 && Array.isArray(res.data) ? res.data : [];

  return <Section3 blogs={blogs} />;
}
