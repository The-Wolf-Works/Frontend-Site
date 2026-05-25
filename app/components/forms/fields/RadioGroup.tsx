
// Interface for RadioGroup component props
interface RadioGroupProps {
    label: string
    name: string
    options: string[]
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// RadioGroup component for selecting one option from a list
const RadioGroup = ({ label, name, options, value, onChange }: RadioGroupProps) => (
    <div className="flex flex-col gap-2">
        <p className="text-white/60 text-sm">{label}</p>
        {options.map(option => (
            <label key={option} className="flex items-center gap-3 text-white/70 text-sm cursor-pointer">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      value === option
                          ? 'border-brand-primary bg-brand-primary'
                          : 'border-white/30 bg-transparent'
                  }`}>
                    {value === option && <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />}
                </div>
                <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={value === option}
                    onChange={onChange}
                    required
                    className="sr-only"
                />
                {option}
            </label>
        ))}
    </div>
)

export default RadioGroup
