const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro resolve from both local and root node_modules, plus .pnpm store
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules/.pnpm'),
];

// 3. Allow Metro to follow symlinks (important for pnpm)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Let Metro's default resolver handle it, but with symlinks enabled
  if (context.resolveRequest) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return null;
};

// 4. Disable hierarchical lookup
config.resolver.disableHierarchicalLookup = false;

module.exports = config;