import { icons } from '@/app/components/icons/Icons'

const { lockClosed: LockClosedIcon } = icons

const Unauthorised = () => {
    return (
        <div className="flex-1 flex items-center justify-center py-24 px-6">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <LockClosedIcon className="w-7 h-7 text-white/40" />
                </div>
                <h1 className="text-2xl font-extrabold text-white mb-3">Access Required</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                    This area is restricted. Please use the access link provided to you to continue.
                </p>
            </div>
        </div>
    )
}

export default Unauthorised
