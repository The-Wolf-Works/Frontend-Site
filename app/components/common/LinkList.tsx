import Link from "next/link"

interface LinkItem {
    label: string
    href: string
    external?: boolean
}

interface LinkListProps {
    links: LinkItem[]
    className?: string
}


const LinkList = ({ links, className }: LinkListProps) => {
    return (
        <ul className="flex item-center gap-6">
            {links.map((link) => (
                <li key={link.href}>
                    {link.external ? (
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                        >
                            {link.label}
                        </a>
                    ) : (
                            <Link href={link.href} className={className}>
                                {link.label}
                            </Link>
                    )}
                </li>
            ))}
        </ul>
    )
}
export default LinkList
