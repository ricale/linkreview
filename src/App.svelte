<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

  import store from './store';
  import db from './lib/db';
  import auth from './lib/auth';
  import HomePage from './pages/HomePage.svelte'
  import UserPage from './pages/UserPage.svelte';
  import LinkReviewPage from './pages/LinkReviewPage.svelte';
  
  export let url = '';

  const queryClient = new QueryClient();

  onMount(() => {
    auth.onUserChanged(async (user) => {
      if(user === null) {
        store.setCurrentUser(null);
        return;
      }
      const signed = await db.setUser({
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        thumbnailUrl: user.providerData[0].photoURL,
        uidInProvider: user.providerData[0].uid,
        uid: user.uid
      })

      store.setCurrentUser(signed);
    })
  })

  function onClickSignIn() {
    auth.signIn();
  }
  function onClickSignOut() {
    auth.signOut();
  }
</script>

{#if $store.currentUser}
  <span on:click={onClickSignOut}>sign out</span>
{:else if $store.currentUser === null}
  <span on:click={onClickSignIn}>sign in</span>
{:else}
  <span>loading...</span>
{/if}

<QueryClientProvider client={queryClient}>
  <Router url="{url}">
    <div>
      <Route path="/linkReviews/:id" let:params>
        <LinkReviewPage id="{params.id}" />
      </Route>
      <Route path="/:openid" let:params>
        <UserPage openid="{params.openid}" />
      </Route>
      <Route path="/" component="{HomePage}" />
    </div>
  </Router>
</QueryClientProvider>

<style>
  
</style>
