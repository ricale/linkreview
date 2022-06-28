<script lang='ts'>
  import db from "../lib/db";

  export let id = '';
  export let url = '';
  export let title = '';
  export let content = '';
  export let userId = '';

  let editable = false;

  function onClickSave() {
    db.setLinkReview({
      id,
      url,
      title,
      content,
      userId,
    })
  }
  
</script>

<div>
  <input type='checkbox' bind:checked="{editable}" >
  {#if editable}
    <div>
      <input bind:value={url} />
    </div>
    <div>
      <input bind:value={title} />
    </div>
    <div>
      <input bind:value={content} />
    </div>
    <button on:click={onClickSave}>저장</button>
  {:else}
    <div>url: {url}</div>
    <div>title: {title}</div>
    <div>content: {content}</div>
    <div>userId: {userId}</div>
  {/if}
</div>