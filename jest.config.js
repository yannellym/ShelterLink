module.exports = {
  
    transform: { '^.+.(ts|mjs|js|html)$': 'jest-preset-angular' },
    transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
 
  }