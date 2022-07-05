<script lang='ts'>
  import { useSetLinkReviewMutation } from "../queries/linkReviews";

  export let id = '';
  export let url = '';
  export let title = '';
  export let content = '';
  export let userId = '';
  export let createdAt = '';
  export let createdTimestamp = '';

  let editable = false;
  let mutation = useSetLinkReviewMutation();

  function onClickSave() {
    $mutation.mutate({
      id,
      url,
      title,
      content,
      userId,
    })
  }
  
  function disableEditable() {
    editable = false;
  }
  $: if($mutation.status === 'success' ) {
    disableEditable();
  }
</script>

<div>
  <div>isSuccess: {$mutation.isSuccess ? 'true' : 'false'}</div>
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
    <div>createdAt: {createdAt}</div>
  {/if}
</div>