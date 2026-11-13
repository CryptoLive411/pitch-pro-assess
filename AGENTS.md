# Architecture rules

- Keep Custom package normalization, mandatory-service toggles, and quote calculations in `src/lib/custom-package.ts` so saved selections and interactive pricing enforce the same rules and can be tested independently.