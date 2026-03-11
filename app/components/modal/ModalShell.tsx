'use client'

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalShellProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalShell = ({ onClose, children }: ModalShellProps) => {

    useEffect(() => {
        // ESC key to close
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

              {/* Backdrop */}
              <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={onClose}
              />

              {/* Modal container */}
              <div className="relative z-10 w-full max-w-lg bg-brand-secondary border border-white/10 rounded-2xl shadow-2xl">

                  {/* Close button */}
                  <button
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                      <XMarkIcon style={{ width: 20, height: 20 }} />
                  </button>

                  {/* Content */}
                  <div className="p-8">
                      {children}
                  </div>

              </div>
          </div>
      )
}
export default ModalShell
