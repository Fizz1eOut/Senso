import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVitest from '@vitest/eslint-plugin';

export default withNuxt(
  {
    rules: {
      'vue/max-attributes-per-line': ['warn', {
        singleline: 3,
        multiline: 3
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'eol-last': ['error', 'always'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2, {
        SwitchCase: 1,
        ignoredNodes: [
          'TemplateLiteral',
          'Program > ExpressionStatement > TemplateLiteral',
          'Program',
          'ExpressionStatement > CallExpression'
        ]
      }],
      'vue/script-indent': ['error', 2, {
        baseIndent: 1,
        switchCase: 1,
        ignores: []
      }],
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true
      }]
    }
  },
  {
    files: ['pages/**/*.vue', 'layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['**/*.test.ts', '**/*.spec.ts']
  }
);
