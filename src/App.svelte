<script lang="ts">
  import { onMount } from 'svelte';
  import app, { signIn } from './lib/firebase';

  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte'
  
  export let url = '';

  onMount(() => {
    signIn();
  })
</script>

<h1>App</h1>

<Router url="{url}">
  <div>
    <Route path="/" component="{Home}" />
  </div>
</Router>

<style>
  
</style>
