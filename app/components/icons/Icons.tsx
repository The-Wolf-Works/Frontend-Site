import {
    ShieldCheckIcon,
    CheckCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    LightBulbIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline'

export const icons = {
    shieldCheck: ShieldCheckIcon,
    checkCircle: CheckCircleIcon,
    clock: ClockIcon,
    magnifyingGlass: MagnifyingGlassIcon,
    lightBulb: LightBulbIcon,
    rocketLaunch: RocketLaunchIcon
} as const

export type IconName = keyof typeof icons
