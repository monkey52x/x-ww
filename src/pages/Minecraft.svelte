<script>
  import { t } from '../i18n.js'
  import { navigate } from 'svelte-routing'

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }
</script>

<div class="page">
  <a href="/fun" class="back-link" on:click={(e) => goTo('/fun', e)}>
    ← {$t('back')}
  </a>
  <h1 class="page-title">{$t('minecraft.title')}</h1>
  <p class="page-desc">{$t('minecraft.description')}</p>
</div>

<style>
</style>