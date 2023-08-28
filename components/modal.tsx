'use client'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)}>
  
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>

          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}