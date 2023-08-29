'use client'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRadioGroup from './taskTypeRadioGroup'

export default function Modal() {

    const [newTaskInput, setNewTaskInput] = useBoardStore((state) => [state.newTaskInput, state.setNewTaskInput])
    const [image, setImage] = useBoardStore((state) => [state.image, state.setImage])

    const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal])

    const imagePickerRef = useRef<HTMLInputElement>(null)

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="form" onClose={closeModal} className="relative z-10" >

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>


                <div className="fixed inset-0 overflow-y-auto">

                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >

                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                            >

                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    Add a Task
                                </Dialog.Title>

                                <div className="mt-2">

                                    <input
                                        type="text"
                                        value={newTaskInput}
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        placeholder='Enter a task here'
                                        className='w-full border border-gray-300 rounded-md outline-none p-5'
                                    />

                                </div>

                                <TaskTypeRadioGroup />

                                <div className="">
                                    <input
                                        type="file"
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            if (!e.target.files![0].type.startsWith("image/")) return
                                            setImage(e.target.files![0])
                                        }}
                                    />

                                </div>

                            </Dialog.Panel>

                        </Transition.Child>

                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}