export const plantsQueryKeys = {
  all: ['plants'] as const,
  lists: () => [...plantsQueryKeys.all, 'list'] as const,
  list: (params: { search: string; category: string | null }) =>
    [...plantsQueryKeys.lists(), params] as const,
  detail: (slug: string) =>
    [...plantsQueryKeys.all, 'detail', slug] as const,
};
