import Image from 'next/image'
import type { AboutTheWolfPackBlock } from '@/lib/types'
import { section } from 'framer-motion/client'

interface WolfPackProps {
    block: AboutTheWolfPackBlock
}

export const AboutTheWolfPack = ({ block }: WolfPackProps) => {
    return (
        <section className="bg-brand-secondary px-8 nav:px-20 py-16">

            {/* Heading */}
            <div className="mb-12">
                <p className="text-sm font-medium tracking-widest uppercase text-brand-primary mb-3">
                    Team
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                    About the <span className="text-brand-primary">Wolf</span> pack
                </h2>
            </div>

            {/* Member cards */}
            <div className="grid grid-cols-1 nav:grid-cols-2 gap-6">
                {block.members.map(({ member }, index) => (
                    <div
                        key={index}
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-10 flex
   flex-col items-center text-center hover:border-brand-primary/40 transition-all duration-500"
                    >
                        {/* Photo */}
                        {member.photo?.node?.sourceUrl && (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6
  ring-2 ring-white/10 group-hover:ring-brand-primary/40 transition-all duration-500">
                                <Image
                                    src={member.photo.node.sourceUrl}
                                    alt={member.photo.node.altText || member.name}
                                    fill
                                    className="object-cover grayscale"
                                />
                            </div>
                        )}

                        {/* Role */}
                        <p className="text-white/50 text-sm mb-2">
                            {member.roles.map(r => r.role).join(' / ')}
                        </p>

                        {/* Name */}
                        <h3 className="text-2xl font-extrabold text-brand-primary mb-4">
                            {member.name}
                        </h3>

                        {/* Bio */}
                        <p className="text-white/50 text-base leading-relaxed">
                            {member.bio}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default AboutTheWolfPack
