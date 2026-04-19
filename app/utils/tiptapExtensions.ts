import { Node, Extension, mergeAttributes } from '@tiptap/core'

export const DivNode = Node.create({
    name: 'div',
    group: 'block',
    content: 'block*',
    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) return {}
                    return { class: attributes.class}
                }
            }
        }
    },
    parseHTML() {
        return [{ tag: 'div' }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    }
})

export const ClassPreserver = Extension.create({
    name: 'classPreserver',
    addGlobalAttributes() {
        return [
            {
                types: ['paragraph', 'bulletList', 'orderedList', 'listItem', 'blockquote'],
                attributes: {
                    class: {
                        default: null,
                        parseHTML: element => element.getAttribute('class'),
                        renderHTML: attributes => {
                            if (!attributes.class) return {}
                            return { class: attributes.class }
                        }
                    }
                }
            }
        ]
    }
})
