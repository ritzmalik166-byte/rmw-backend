async function callServicesData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
            cache: 'force-cache',
            next: { revalidate: 60 }
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export default callServicesData;