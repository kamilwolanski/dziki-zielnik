import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:database',
              onlyDependOnLibsWithTags: ['type:database'],
            },
            {
              sourceTag: 'type:contracts',
              onlyDependOnLibsWithTags: ['type:database', 'type:contracts'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:database', 'type:data-access'],
            },
            {
              sourceTag: 'type:backend',
              onlyDependOnLibsWithTags: [
                'type:database',
                'type:contracts',
                'type:data-access',
              ],
            },
            {
              sourceTag: 'type:mobile',
              onlyDependOnLibsWithTags: ['type:contracts', 'type:api-client'],
            },
            {
              sourceTag: 'type:database-seed',
              onlyDependOnLibsWithTags: [
                'type:database',
                'type:database-seed',
                'type:data-access',
              ],
            },
            {
              sourceTag: 'type:api-client',
              onlyDependOnLibsWithTags: ['type:api-client', 'type:contracts'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
