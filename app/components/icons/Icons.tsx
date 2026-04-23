import {
    ShieldCheckIcon,
    CheckCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    LightBulbIcon,
    RocketLaunchIcon,
    LockClosedIcon,
    EyeIcon,
    UserIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    SparklesIcon,
    ArrowPathIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'
import { FlagIcon } from '@heroicons/react/24/solid'

export const icons = {
    shieldCheck: ShieldCheckIcon,
    checkCircle: CheckCircleIcon,
    clock: ClockIcon,
    magnifyingGlass: MagnifyingGlassIcon,
    lightBulb: LightBulbIcon,
    rocketLaunch: RocketLaunchIcon,
    lockClosed: LockClosedIcon,
    eye: EyeIcon,
    user: UserIcon,
    arrowTrendingUp: ArrowTrendingUpIcon,
    arrowTrendingDown: ArrowTrendingDownIcon,
    sparkles: SparklesIcon,
    arrowPath: ArrowPathIcon,
    check: CheckIcon,
    flag: FlagIcon,
} as const

export type IconName = keyof typeof icons
