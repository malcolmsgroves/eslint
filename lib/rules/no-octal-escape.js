/**
 * @fileoverview Rule to flag octal escape sequences in string literals.
 * @author Ian Christian Myers
 */

"use strict";

const astUtils = require("../ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow octal escape sequences in string literals",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-octal-escape"
        },

        schema: []
    },

    create(context) {

        return {

            Literal(node) {
                const match = astUtils.getOctalEscapeSequence(node);

                if (match) {
                    const octalDigit = match[2];

                    context.report({ node, message: "Don't use octal: '\\{{octalDigit}}'. Use '\\u....' instead.", data: { octalDigit } });
                }
            }

        };

    }
};
