<script lang='ts'>
  import { onMount } from "svelte";
  import db from "../lib/db";
  import LinkReviewItem from "../components/LinkReviewItem.svelte";
import { link } from "svelte-routing";

  export let openid = '';

  let title = '';
  let content = '';
  let url = '';

  let user = null;
  let linkReviews = null;

  onMount(async () => {
    user = await db.getUserByOpenid(openid);
    console.log('user', user);

    linkReviews = await db.getLinkReviews(user.uid);
    console.log('linkReviews', linkReviews)
  })

  function saveLink() {
    db.setLinkReview({
      title,
      content,
      url,
      userId: user.uid,
    })
  }
</script>

<h2>User</h2>
<p>{openid}</p>

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

{#if linkReviews !== null}
{#each linkReviews as linkReview}
<LinkReviewItem
  {...linkReview}
/>
{/each}
{/if}