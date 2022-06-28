<script lang='ts'>
  import { Link } from 'svelte-routing';
  import store from '../store';

  $: currentUser = $store.currentUser
</script>

<h2>Home</h2>


{#if currentUser}
  <Link to="{`/${currentUser?.openid}`}">{currentUser?.openid}</Link>
{/if}