export const plantsQueryKeys = {
  all: ['plants'] as const,
  lists: () => [...plantsQueryKeys.all, 'list'] as const,
  detail: (slug: string) => [...plantsQueryKeys.all, slug] as const,
};
