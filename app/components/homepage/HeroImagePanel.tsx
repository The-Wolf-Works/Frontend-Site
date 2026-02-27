"use client"

import Image from "next/image"
import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export const HeroImagePanel = () => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5)
            mouseY.set(e.clientY / window.innerHeight - 0.5)
        }
        window.addEventListener("mousemove", handleMove)
        return () => window.removeEventListener("mousemove", handleMove)
    }, [mouseX, mouseY])

    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
    const imgX = useTransform(springX, [-0.5, 0.5], ["-40px", "40px"])
    const imgY = useTransform(springY, [-0.5, 0.5], ["-40px", "40px"])

    return (
        <div
            className="hidden md:block w-2/5 relative overflow-hidden"
            style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
            <motion.div
                className="absolute inset-0"
                style={{ x: imgX, y: imgY, scale: 1.25 }}
            >
                <Image
                    src="/hero-image.png"
                    alt="The Wolf Works"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Subtle teal overlay */}
            <div className="absolute inset-0 bg-brand-primary opacity-20" />
            {/* Left edge shadow — makes image appear set back from content */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-black/25 to-transparent z-10" />
        </div>
    )
}

export default HeroImagePanel
