import ServiceThirdMainPage from "@/allPages/serviceThirdPage/ServiceThirdMainPage";
import ServiceThirdMainPage2 from "@/allPages/serviceThirdPage/ServiceThirdMainPage2";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type ThirdCardRow = RowDataPacket & {
  title: string;
  description: string;
  image_url: string | null;
};

type InitialCard = {
  title: string;
  description: string;
  image_url?: string;
};

const Page = async ({
  params,
}: {
  params: Promise<{ secondPage: string; thirdPage: string }>;
}) => {
  const { secondPage, thirdPage } = await params;

  let initialData = {
    s3heading1: null as string | null,
    s3endtag: null as string | null,
    cards: [] as InitialCard[],
  };

  try {
    const pool = await getDBPool();

    const [services] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM services WHERE link = ? LIMIT 1",
      [secondPage]
    );

    if (services.length > 0) {
      const serviceId = services[0].id;
      const [serviceSeconds] = await pool.query<RowDataPacket[]>(
        `SELECT id, s3heading1, s3endtag
         FROM service_second
         WHERE link = ? AND service_id = ?
         LIMIT 1`,
        [thirdPage, serviceId]
      );

      if (serviceSeconds.length > 0) {
        const serviceSecond = serviceSeconds[0];
        const [cards] = await pool.query<ThirdCardRow[]>(
          "SELECT id, title, description, image_url FROM service_third WHERE service2_id = ?",
          [serviceSecond.id]
        );

        initialData = {
          s3heading1: serviceSecond.s3heading1 ?? null,
          s3endtag: serviceSecond.s3endtag ?? null,
          cards: cards.map((item) => ({
            title: item.title,
            description: item.description,
            image_url: item.image_url ?? undefined,
          })),
        };
      }
    }
  } catch (error) {
    console.warn(
      `[services/${secondPage}/${thirdPage}] DB unavailable, using empty fallback:`,
      error
    );
  }

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Services Third Banner" href="/service-images/services-third-banner.jpg" as="image" />
      
      <div>
        {thirdPage === "newspaper-ad-rates" ? (
          <ServiceThirdMainPage2 />
        ) : (
          <ServiceThirdMainPage initialData={initialData} />
        )}
      </div>
    </>
  );
};

export default Page;