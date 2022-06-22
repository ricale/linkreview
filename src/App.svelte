<script lang="ts">
  import { onMount } from 'svelte';
  import app, { getUser, getUserByOpenid, getUsers, onUserChanged, setUser, signIn } from './lib/firebase';

  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte'
  
  export let url = '';

  onMount(() => {
    onUserChanged(user => {
      console.log('user', user)
      if(user === null) {
        // signIn();
        return;
      }
      setUser({
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        thumbnailUrl: user.providerData[0].photoURL,
        uidInProvider: user.providerData[0].uid,
        uid: user.uid
      })

      getUser(user.uid).then(result => {
        console.log('result', result)
        if(result?.openid) {
          getUserByOpenid(result.openid).then(resultByOpenid => {
            console.log('resultByOpenid', resultByOpenid)
          })
        }
      })
    })

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
