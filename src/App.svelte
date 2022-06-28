<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';

  import store from './store';
  import db from './lib/db';
  import auth from './lib/auth';
  import HomePage from './pages/HomePage.svelte'
  import UserPage from './pages/UserPage.svelte';
  
  export let url = '';

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
</script>

<h1>App</h1>

<Router url="{url}">
  <div>
    <Route path="/:openid" let:params>
      <UserPage openid="{params.openid}" />
    </Route>
    <Route path="/" component="{HomePage}" />
  </div>
</Router>

<style>
  
</style>
