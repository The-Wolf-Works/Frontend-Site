import {
    ShieldCheckIcon,
    CheckCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    LightBulbIcon,
    RocketLaunchIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'

export const icons = {
    shieldCheck: ShieldCheckIcon,
    checkCircle: CheckCircleIcon,
    clock: ClockIcon,
    magnifyingGlass: MagnifyingGlassIcon,
    lightBulb: LightBulbIcon,
    rocketLaunch: RocketLaunchIcon,
    lockClosed: LockClosedIcon
} as const

export type IconName = keyof typeof icons
