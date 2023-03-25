module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  channels: [
    {
      id: 'channel-1',
      name: 'general',
      type: 'text',
    },
  ],
  guilds: [
    {
      id: 'guild-1',
      name: 'My Guild',
      channels: ['channel-1'],
    },
  ],
};
