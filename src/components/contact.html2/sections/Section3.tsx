"use client";

const MAP_EMBED_URL =
    "https://www.google.com/maps?q=Ritz+Media+World,+Unit+no,+Tower+A1,+Corporate+Park,+4th+floor,+402-404,+Sector+142,+Noida,+Uttar+Pradesh+201305&output=embed";

function Section3() {
    return (
        <section className="w-full bg-white lg:py-[70px] py-[0px]">
            <div className=" w-full">
                <div className="w-full overflow-hidden  aspect-video xl:aspect-auto xl:h-[600px]">
                    <iframe
                        src={MAP_EMBED_URL}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ritz Media World - 402-404, 4th floor Corporate Park, Tower A1, Sector 142, Noida"
                        className="w-full h-full min-h-[280px] xl:min-h-0"
                    />
                </div>
            </div>
        </section>
    );
}

export default Section3;
