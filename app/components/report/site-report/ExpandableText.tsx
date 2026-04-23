'use client'

import { useRef, useState } from 'react'

interface Props {
    text: string
    lines?: number
    className?: string
    // controlled mode
    expanded?: boolean
    onToggle?: () => void
}

const ExpandableText = ({ text, lines = 3, className = '', expanded: controlledExpanded, onToggle }: Props) => {
    const [internalExpanded, setInternalExpanded] = useState(false)
    const [expandedHeight, setExpandedHeight] = useState(0)
    const contentRef = useRef<HTMLParagraphElement>(null)

    const isControlled = controlledExpanded !== undefined
    const expanded = isControlled ? controlledExpanded : internalExpanded

    // text-sm (0.875rem) * leading-relaxed (1.625)
    const collapsedHeight = `${lines * 1.625 * 0.875}rem`

    const toggle = () => {
        if (!expanded && contentRef.current) {
            setExpandedHeight(contentRef.current.scrollHeight)
        }
        if (isControlled) {
            onToggle?.()
        } else {
            setInternalExpanded(v => !v)
        }
    }

    return (
        <div>
            <div
                style={{
                    overflow: 'hidden',
                    maxHeight: expanded ? `${expandedHeight}px` : collapsedHeight,
                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <p ref={contentRef} className={className}>{text}</p>
            </div>
            <button
                onClick={toggle}
                className="mt-1.5 text-xs font-medium text-white/35 hover:text-white/60 transition-colors cursor-pointer"
            >
                {expanded ? 'Show less ↑' : 'Show more ↓'}
            </button>
        </div>
    )
}

export default ExpandableText
