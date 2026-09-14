const command = process.argv[2] ?? 'migration';

console.error(
  `migration:${command} is reserved for a later slice and does not read WXR inputs.`,
);
process.exitCode = 1;
