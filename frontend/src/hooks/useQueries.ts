import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Profile, Item, BorrowRequest, LostItem, FoundItem, RequestStatus } from '../backend';

// ─── Profile ─────────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Profile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Items ────────────────────────────────────────────────────────────────────

export function useGetAvailableItems() {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['availableItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllItems() {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['allItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetItemsByOwner(ownerPrincipal: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['itemsByOwner', ownerPrincipal],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getItemsByOwner(ownerPrincipal);
    },
    enabled: !!actor && !isFetching && !!ownerPrincipal,
  });
}

export function useGetItemsByBorrower(borrowerPrincipal: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Item[]>({
    queryKey: ['itemsByBorrower', borrowerPrincipal],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getItemsByBorrower(borrowerPrincipal);
    },
    enabled: !!actor && !isFetching && !!borrowerPrincipal,
  });
}

export function useAddItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      category: string;
      hashtag: string;
      name: string;
      description: string;
      pricePerDay: bigint | null;
      pricePerMonth: bigint | null;
      location: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addItem(
        params.category,
        params.hashtag,
        params.name,
        params.description,
        params.pricePerDay,
        params.pricePerMonth,
        params.location,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableItems'] });
      queryClient.invalidateQueries({ queryKey: ['allItems'] });
      queryClient.invalidateQueries({ queryKey: ['itemsByOwner'] });
    },
  });
}

export function useCreateBorrowRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { itemId: bigint; borrowTime: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBorrowRequest(params.itemId, params.borrowTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableItems'] });
      queryClient.invalidateQueries({ queryKey: ['allItems'] });
    },
  });
}

export function useUpdateBorrowRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { itemId: bigint; newStatus: RequestStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBorrowRequestStatus(params.itemId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableItems'] });
      queryClient.invalidateQueries({ queryKey: ['allItems'] });
      queryClient.invalidateQueries({ queryKey: ['itemsByOwner'] });
    },
  });
}

export function useGetUserBorrowingHistory(userPrincipal: string) {
  const { actor, isFetching } = useActor();

  return useQuery<BorrowRequest[]>({
    queryKey: ['borrowingHistory', userPrincipal],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserBorrowingHistory(userPrincipal);
    },
    enabled: !!actor && !isFetching && !!userPrincipal,
  });
}

// ─── Lost & Found ─────────────────────────────────────────────────────────────

export function useGetLostItems() {
  const { actor, isFetching } = useActor();

  return useQuery<LostItem[]>({
    queryKey: ['lostItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLostItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFoundItems() {
  const { actor, isFetching } = useActor();

  return useQuery<FoundItem[]>({
    queryKey: ['foundItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFoundItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddLostItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      description: string;
      lastSeenLocation: string;
      contactInfo: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addLostItem(params.description, params.lastSeenLocation, params.contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lostItems'] });
    },
  });
}

export function useAddFoundItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      description: string;
      pickUpLocation: string;
      contactInfo: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addFoundItem(params.description, params.pickUpLocation, params.contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foundItems'] });
    },
  });
}

export function useResolveLostItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.resolveLostItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lostItems'] });
    },
  });
}

export function useResolveFoundItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; receiver: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.resolveFoundItem(params.id, params.receiver);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foundItems'] });
    },
  });
}
