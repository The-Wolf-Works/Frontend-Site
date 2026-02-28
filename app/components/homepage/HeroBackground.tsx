"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export const HeroBackground = () => {
    return (
        <motion.div
            className="absolute inset-0"
            animate={{ x: ["0%", "-5%"] }}
            transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }}
            style={{ scale: 1.1 }}
        >
            <Image
                src="/hero-image.png"
                alt=""
                fill
                className="object-cover"
                priority
            />
        </motion.div>
    )
}

export default HeroBackground
