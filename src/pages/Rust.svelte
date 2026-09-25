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

  <div class="glass rust-card">
    <h2 class="rust-card-title">🔧 {$t('rust.linkTitle')}</h2>
    <p class="rust-card-desc">{$t('rust.linkDesc')}</p>
    <a
      class="btn-glass"
      href="https://rusthelp.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {$t('rust.linkButton')} ↗
    </a>
  </div>
</div>

<style>
  .rust-card {
    padding: 28px 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    max-width: 560px;
  }

  .rust-card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--white);
  }

  .rust-card-desc {
    font-size: 0.9rem;
    color: var(--white-dim);
  }

  .page-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .page-desc {
    font-size: 0.95rem;
    color: var(--white-dim);
    margin-bottom: 24px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    margin-bottom: 16px;
    border: 1px solid var(--border-glass);
    border-radius: 10px;
    color: var(--white-dim);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .back-link:hover {
    color: var(--white);
    border-color: var(--purple-500);
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
  }
</style>