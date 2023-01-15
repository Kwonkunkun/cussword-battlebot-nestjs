/**
 * @description  service 종류
 */
export const myServices = ['cussword', 'emergency'] as const;
export type MyService = (typeof myServices)[number];

/**
 * @description tier 종류
 */
export const tiers = ['bronze', 'silver', 'gold'] as const;
export type Tier = (typeof tiers)[number];
