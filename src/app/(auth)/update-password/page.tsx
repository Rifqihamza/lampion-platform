import { UpdatePassForm } from "./_components/updatePassword-form";
import { redirect } from "next/navigation";

// Definisi tipe SearchParams sesuai dokumentasi Next.js
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function UpdatePasswordPage(props: {
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;
    const token = searchParams.token;

    // Type guard: Pastikan token adalah string dan tidak kosong
    if (typeof token !== "string" || !token) {
        redirect("/login");
    }

    return (
        <main className="w-full h-dvh relative">
            <UpdatePassForm token={token} className="w-full max-w-md flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        </main>
    );
}