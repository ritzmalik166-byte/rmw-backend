import Clients from "@/components/clients/Clients";
import { getClientLogos } from "@/lib/getClientLogos";

function ClientsPage() {
    const logos = getClientLogos();

    return (
        <>
            <Clients logos={logos} />
        </>
    );
}

export default ClientsPage;