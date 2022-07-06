<script lang='ts'>
  import { useGetLinkReviewQuery } from "../queries/linkReviews";
  export let id = '';

  let linkReview = useGetLinkReviewQuery(id);
  $: linkReview = useGetLinkReviewQuery(id);
</script>

{#if $linkReview.data}
<h2>{$linkReview.data?.title}</h2>
<div>{$linkReview.data?.createdAt}</div>
<div>{$linkReview.data?.url}</div>
<div>{$linkReview.data?.content}</div>
{/if}