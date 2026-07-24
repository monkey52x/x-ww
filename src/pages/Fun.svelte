<script>
  import { t } from '../i18n.js'

  const funs = [
    { to: '/fun/randomizer', icon: '🎲', key: 'randomizer' },
  ]

  const games = [
    { to: '/games/rust', icon: '🦀', key: 'rust' },
    { to: '/games/minecraft', icon: '⛏️', key: 'minecraft' },
  ]

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
  <h1 class="page-title">{$t('fun.title')}</h1>
  <p class="page-desc">{$t('fun.description')}</p>

  <h2 class="section-title">🎉 {$t('fun.title')}</h2>
  <div class="fun-grid">
    {#each funs as { to, icon, key }}
      <a href={to} class="glass fun-card" on:click={(e) => goTo(to, e)}>
        <span class="fun-card-icon">{icon}</span>
        <h3 class="fun-card-title">{$t(`nav.${key}`)}</h3>
        <p class="fun-card-desc">{$t(`fun.${key}Desc`)}</p>
      </a>
    {/each}
  </div>

  <h2 class="section-title">🎮 {$t('fun.games')}</h2>
  <div class="fun-grid">
    {#each games as { to, icon, key }}
      <a href={to} class="glass fun-card" on:click={(e) => goTo(to, e)}>
        <span class="fun-card-icon">{icon}</span>
        <h3 class="fun-card-title">{$t(`nav.${key}`)}</h3>
        <p class="fun-card-desc">{$t(`fun.${key}Desc`)}</p>
      </a>
    {/each}
  </div>
</div>

<style>
  .fun-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .fun-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 20px;
    text-align: center;
    text-decoration: none;
    border-radius: var(--radius);
    transition: all var(--transition);
  }

  .fun-card:hover {
    transform: translateY(-4px);
    border-color: var(--purple-500);
    box-shadow: 0 0 25px rgba(124, 58, 237, 0.4);
  }

  .fun-card-icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .fun-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 6px;
  }

  .fun-card-desc {
    font-size: 0.8rem;
    color: var(--white-muted);
  }

  .section-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 32px 0 16px;
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