import { Mark, mergeAttributes } from '@tiptap/core'

export const SmallCaps = Mark.create({
  name: 'smallcaps',

  parseHTML() {
    return [
      {
        tag: 'span[style*="font-variant: small-caps"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { style: 'font-variant: small-caps;' }), 0]
  },

  addCommands() {
    return {
      toggleSmallCaps:
        () =>
          ({ commands }) =>
            commands.toggleMark(this.name),
    }
  },
})
