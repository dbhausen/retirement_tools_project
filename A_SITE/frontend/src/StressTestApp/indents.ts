import { Command, Extension } from '@tiptap/core'
import { AllSelection, TextSelection, Transaction } from 'prosemirror-state'

export interface IndentOptions {
	types: string[]
	minLevel: number
	maxLevel: number
}

declare module '@tiptap/core' {
	// eslint-disable-next-line no-unused-vars
	interface Commands<ReturnType> {
		indent: {
			indent: () => ReturnType
			outdent: () => ReturnType
		}
	}
}

export const Indent = Extension.create<IndentOptions>({
	name: 'indent',

	defaultOptions: {
		types: ['listItem', 'paragraph'],
		minLevel: 0,
		maxLevel: 8,
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					indent: {
						renderHTML: attributes =>
							attributes?.indent > this.options.minLevel
								? { 'data-indent': attributes.indent }
								: null,
						parseHTML: element => {
							const level = Number(element.getAttribute('data-indent'))
							return level && level > this.options.minLevel
								? level
								: null
						},
					},
				},
			},
		]
	},

	addCommands() {
		const setNodeIndentMarkup = (
			tr: Transaction,
			pos: number,
			delta: number
		): Transaction => {
			const node = tr?.doc?.nodeAt(pos)

			if (node) {
				const nextLevel = (node.attrs.indent || 0) + delta
				const { minLevel, maxLevel } = this.options
				const indent =
					// eslint-disable-next-line no-nested-ternary
					nextLevel < minLevel
						? minLevel
						: nextLevel > maxLevel
						? maxLevel
						: nextLevel

				if (indent !== node.attrs.indent) {
					const { indent: oldIndent, ...currentAttrs } = node.attrs
					const nodeAttrs =
						indent > minLevel ? { ...currentAttrs, indent } : currentAttrs
					return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
				}
			}
			return tr
		}

		const updateIndentLevel = (
			tr: Transaction,
			delta: number
		): Transaction => {
			const { doc, selection } = tr

			if (
				doc &&
				selection &&
				(selection instanceof TextSelection ||
					selection instanceof AllSelection)
			) {
				const { from, to } = selection
				doc.nodesBetween(from, to, (node, pos) => {
					if (this.options.types.includes(node.type.name)) {
						// eslint-disable-next-line no-param-reassign
						tr = setNodeIndentMarkup(tr, pos, delta)
						return false
					}

					return true
				})
			}

			return tr
		}
		// eslint-disable-next-line no-unused-vars
		const applyIndent: (direction: number) => () => Command =
			direction =>
			() =>
			({ tr, state, dispatch }) => {
				const { selection } = state
				// eslint-disable-next-line no-param-reassign
				tr = tr.setSelection(selection)
				// eslint-disable-next-line no-param-reassign
				tr = updateIndentLevel(tr, direction)

				if (tr.docChanged) {
					dispatch?.(tr)
					return true
				}

				return false
			}

		return {
			indent: applyIndent(1),
			outdent: applyIndent(-1),
		}
	},

	addKeyboardShortcuts() {
		return {
			Tab: () => this.editor.commands.indent(),
			'Shift-Tab': () => this.editor.commands.outdent(),
		}
	},
})
