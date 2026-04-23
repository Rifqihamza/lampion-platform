import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { DatePicker } from "@/components/ui/datetime-picker"

export default async function Profile() {
    const session = await auth()

    return (
        <section className="bg-card/50 backdrop-blur-sm p-5 rounded-2xl space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Profile Pengguna</h1>
                <Separator />
            </div>

            {/* Bento Grid */}
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Foto Profil */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm space-y-4 col-span-1 items-center">
                    <h2 className="font-semibold">Foto Profil</h2>
                    <Avatar className="h-50 w-50 cursor-pointer ring-2 ring-primary mx-auto">
                        <AvatarImage src={session?.user?.image || "/placeholder-user.jpg"} />
                    </Avatar>
                    <Input name="picture-profile" accept="image/*" type="file" />
                    <p className="text-sm text-muted-foreground">
                        Gambar sebaiknya rasio 1:1 dan ukuran ≤ 2MB.
                    </p>
                </div>

                {/* Data Pribadi */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm space-y-4 col-span-2">
                    <h2 className="font-semibold">Data Pribadi</h2>
                    <div className="flex flex-col gap-2">
                        <label>Nama Lengkap</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder={session?.user?.name || ""} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Username</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder={session?.user?.name || ""} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder={session?.user?.email || ""} disabled />
                        <span className="text-sm text-muted-foreground">
                            Email bisa diubah melalui menu{" "}
                            <Link href="/settings" className="text-blue-500">
                                Setting
                            </Link>
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Headline</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="Contoh: Software Engineer at Lampion Platform" />
                    </div>
                </div>

                {/* Kontak & Lokasi */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm space-y-4 col-span-1">
                    <h2 className="font-semibold">Kontak & Lokasi</h2>
                    <div className="flex flex-col gap-2">
                        <label>No. Telepon</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="08xxxxxxxxxx" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Kota/Kabupaten</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="Masukkan kota/kabupaten" />
                    </div>
                </div>

                {/* Identitas */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm space-y-4 col-span-2">
                    <h2 className="font-semibold">Identitas</h2>
                    <div className="flex flex-col gap-2">
                        <label>Tempat Lahir</label>
                        <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="Masukkan tempat lahir" />
                    </div>
                    <div className="flex flex-row gap-4 ">
                        <div className="flex flex-col gap-2">
                            <label>Tanggal Lahir</label>
                            <DatePicker className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label>Jenis Kelamin</label>
                            <div className="flex gap-6">
                                <label className="flex items-baseline gap-2">
                                    <input type="radio" name="gender" value="male" /> Laki-laki
                                </label>
                                <label className="flex items-baseline gap-2">
                                    <input type="radio" name="gender" value="female" /> Perempuan
                                </label>
                                <label className="flex items-baseline gap-2">
                                    <input type="radio" name="gender" value="unknown" /> Tidak menyebutkan
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pendidikan & Pekerjaan */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm space-y-4 col-span-3">
                    <h2 className="font-semibold">Pendidikan & Pekerjaan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label>Pendidikan Terakhir</label>
                            <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="SMA / S1 / S2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Pekerjaan/Profesi</label>
                            <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="Mahasiswa / Software Engineer" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Institusi/Perusahaan</label>
                            <Input className="placeholder-muted-foreground! p-4 bg-primary/10! focus:ring-2! focus:ring-primary! duration-300" placeholder="Contoh: Lampion Company" />
                            <span className="text-sm text-muted-foreground">
                                Isi dengan nama sekolah, kampus, atau perusahaan kamu
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
