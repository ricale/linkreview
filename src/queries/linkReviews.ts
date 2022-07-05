import { useMutation, useQuery } from "@sveltestack/svelte-query";
import type { LinkReviewData, LinkReviewSetData } from "../lib/db";
import db from "../lib/db";

export function useGetLinkReviewsQuery(userId?: string) {
  return useQuery<LinkReviewData[]>(
    ['linkReviews', userId],
    () => {
      console.log('useGetLinkReviewsQuery', userId)
      return db.getLinkReviews(userId)
    },
    {enabled: !!userId}
  )
}

export function useSetLinkReviewMutation() {
  return useMutation((data: LinkReviewSetData) => db.setLinkReview(data));
}