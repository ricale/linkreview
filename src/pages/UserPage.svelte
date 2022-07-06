<script lang='ts'>
  import LinkReviewItem from "../components/LinkReviewItem.svelte";
  import { useGetUserQuery } from "../queries/users";
  import { useGetLinkReviewsQuery, useSetLinkReviewMutation } from "../queries/linkReviews";

  export let openid = '';

  let title = '';
  let content = '';
  let url = '';

  let user = useGetUserQuery(openid);
  $: user = useGetUserQuery(openid)

  let linkReviews = useGetLinkReviewsQuery($user.data?.uid);
  $: linkReviews = useGetLinkReviewsQuery($user.data?.uid);

  let mutation = useSetLinkReviewMutation();

  function saveLink(evt) {
    evt.preventDefault();
    $mutation.mutate({
      title,
      content,
      url,
      userId: $user.data.uid,
    })
  }
</script>

<h2>User</h2>
<p>{openid}</p>

<h3>사용자 정보</h3>
<div>{$user.data?.uid}</div>
<div>{$user.data?.name}</div>
<div>{$user.data?.email}</div>

<h3>작성</h3>
<form>
  <div>
    <label for='title'>title</label>
    <input id='title' bind:value={title}>
  </div>
  <div>
    <label for='content'>content</label>
    <input id='content' bind:value={content}>
  </div>
  <div>
    <label for='url'>url</label>
    <input id='url' bind:value={url}>
  </div>
  <button on:click={saveLink}>저장</button>
</form>

<h3>목록</h3>
{#if !!$linkReviews.data}
{#each $linkReviews.data as linkReview}
<LinkReviewItem
  {...linkReview}
/>
{/each}
{/if}

<style>
  form {
    padding: 10px;
  }
</style>