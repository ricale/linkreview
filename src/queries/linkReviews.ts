import { useMutation, useQuery, useQueryClient } from "@sveltestack/svelte-query";
import type { LinkReviewData, LinkReviewSetData } from "../lib/db";
import db from "../lib/db";

const LINK_REVIEW_KEY = 'linkReviews'

export function useGetLinkReviewQuery(id: string) {
  return useQuery<LinkReviewData>(
    [LINK_REVIEW_KEY, id],
    () => db.getLinkReview(id),
    { enabled: !!id }
  )
}

export function useGetLinkReviewsQuery(userId: string) {
  return useQuery<LinkReviewData[]>(
    [LINK_REVIEW_KEY, { userId }],
    () => db.getLinkReviews(userId),
    {enabled: !!userId}
  )
}

export function useSetLinkReviewMutation(userId?: string) {
  const queryClickent = useQueryClient();
  return useMutation(
    (data: LinkReviewSetData) => db.setLinkReview(data),
    {
      onSuccess: () => {
        queryClickent.invalidateQueries(
          userId ? [LINK_REVIEW_KEY, userId] : LINK_REVIEW_KEY
        )
      }
    }
  );
}

export function useDeleteLinkReviewMutation(userId?: string) {
  const queryClickent = useQueryClient();
  return useMutation(
    (id: string) => db.deleteLinkReview(id),
    {
      onSuccess: () => {
        queryClickent.invalidateQueries(
          userId ? [LINK_REVIEW_KEY, userId] : LINK_REVIEW_KEY
        )
      }
    }
  );
}
