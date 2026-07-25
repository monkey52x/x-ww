<script>
  import { t } from '../i18n.js'
  import { navigate } from 'svelte-routing'

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }
</script>

<div class="page">
  <a href="/" class="back-link" on:click={(e) => goTo('/', e)}>
    ← {$t('back')}
  </a>
  <h1 class="page-title">{$t('rust.title')}</h1>
  <p class="page-desc">{$t('rust.description')}</p>
</div>

<style>
</style>