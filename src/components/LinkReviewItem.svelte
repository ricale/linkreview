<script lang='ts'>
  import { Link } from "svelte-routing";
  import { useDeleteLinkReviewMutation, useSetLinkReviewMutation } from "../queries/linkReviews";

  export let id = '';
  export let url = '';
  export let title = '';
  export let content = '';
  export let userId = '';
  export let createdAt = '';
  // export let createdTimestamp = '';

  let editable = false;
  let setMutation = useSetLinkReviewMutation();
  let delMutation = useDeleteLinkReviewMutation();

  function onClickSave() {
    $setMutation.mutate({
      id,
      url,
      title,
      content,
      userId,
    })
  }

  function onClickDelete() {
    $delMutation.mutate(id)
  }
  
  function disableEditable() {
    editable = false;
  }
  $: if($setMutation.status === 'success' ) {
    disableEditable();
  }
</script>

<div class='container'>
  <label for='editable'>수정폼 보기</label>
  <input id='editable' type='checkbox' bind:checked="{editable}" >
  <button on:click={onClickDelete}>삭제</button>
  {#if editable}
    <form>
      <div>
        <label for='url'>url</label>
        <input id='url' bind:value={url} />
      </div>
      <div>
        <label for='title'>title</label>
        <input id='title' bind:value={title} />
      </div>
      <div>
        <label for='content'>content</label>
        <input id='content' bind:value={content} />
      </div>
      <button on:click={onClickSave}>저장</button>
    </form>
  {:else}
    <div class='contents'>
      <h4><Link to="{`/linkReviews/${id}`}">{title}</Link></h4>
      <div>{createdAt}</div>
      <div>url: {url}</div>
      <div>content: {content}</div>
      <div>userId: {userId}</div>
    </div>
  {/if}
</div>

<style>
  div.container {
    border-bottom: 1px solid #EEE;
  }
  form {
    padding: 10px;
  }
  div.contents {
    padding: 10px;
  }
  h4 {
    margin: 0;
  }
</style>