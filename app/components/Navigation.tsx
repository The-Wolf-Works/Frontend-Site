import { client } from "@/lib/client"
import { GET_PRIMARY_MENU } from "@/lib/queries"
import type { GetMenuResponse, MenuItem } from "@/lib/types"
import Link from "next/link"
import Image from 'next/image'

export const Navigation = async () => {
    const data = await client.request<GetMenuResponse>(GET_PRIMARY_MENU)
    const menuItems = data.menuItems.nodes

    return (
        <div className="bg-white w-full px-12 py-5 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
                <Image
                    src="/logo.png"
                    alt="The Wolf Works"
                    height={50}
                    width={150}
                    className="h-[50px] w-auto"
                    priority
                />
            </Link>
            <ul className="flex items-center gap-10">
            {menuItems.map((item) => (
                <li
                    key={item.id}
                    className="list-none"
                >
                <Link
                    href={item.path}
                    className="text-sm font-medium tracking-widest uppercase text-gray-900 no-underline hover:text-gray-500 transition-colors duration-200"
                >
                    {item.label}
                </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}
export default Navigation
