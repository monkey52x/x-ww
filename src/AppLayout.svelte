<script>
  import { useLocation } from 'svelte-routing'
  import { onMount } from 'svelte'
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import Home from './pages/Home.svelte'
  import Fun from './pages/Fun.svelte'
  import Randomizer from './pages/Randomizer.svelte'
  import Rust from './pages/Rust.svelte'
  import Minecraft from './pages/Minecraft.svelte'
  import Vlogf from './pages/Vlogf.svelte'
  import Seido from './pages/Seido.svelte'

  const BIO_PATHS = ['/vlogf', '/seido']
  const location = useLocation()

  onMount(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  })

  $: if ($location.pathname) {
    window.scrollTo(0, 0)
  }
</script>

{#if !BIO_PATHS.includes($location.pathname)}
  <Header />
{/if}

{#if $location.pathname === '/'}
  <Home />
{:else if $location.pathname === '/fun'}
  <Fun />
{:else if $location.pathname === '/fun/randomizer'}
  <Randomizer />
{:else if $location.pathname === '/games/rust'}
  <Rust />
{:else if $location.pathname === '/games/minecraft'}
  <Minecraft />
{:else if $location.pathname === '/vlogf'}
  <Vlogf />
{:else if $location.pathname === '/seido'}
  <Seido />
{/if}

{#if !BIO_PATHS.includes($location.pathname)}
  <Footer />
{/if}