import { Separator } from "@/components/ui/separator";

export default function Settings() {
    return (
        <>
            <section className="w-full bg-primary/5 backdrop-blur-xs p-6 rounded-xl space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard Setting</h1>
                    <Separator />
                </div>
            </section>
        </>
    )
}