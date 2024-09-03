import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logout from '@/components/Logout'

const HomePage = async () => {
    const session = await auth();

    if (!session?.user) redirect("/");

    return (
        <div className="flex flex-col items-center m-4">
            <Logout />
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name || session?.user?.username}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
            />

            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="/priv">priv</Link>
            <Link href="/protected">protected</Link>

        </div>
    );
};

export default HomePage;