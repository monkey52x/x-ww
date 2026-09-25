<script>
  import { t } from '../i18n.js'
  import { HEROES, heroImg } from '../data/heroes.js'
  import { banned } from '../data/bans.js'

  export let open = false
  export let onClose = () => {}

  $: bannedHeroes = HEROES.filter((h) => $banned.has(h.key))

  function closeOnBackdrop(e) {
    if (e.target === e.currentTarget) onClose()
  }
</script>

{#if open}
  <div
    class="modal-backdrop"
    role="button"
    tabindex="0"
    aria-label="close"
    on:click={closeOnBackdrop}
    on:keydown={(e) => { if (e.key === 'Escape') onClose() }}
  >
    <div class="glass modal" role="dialog" aria-modal="true">
      <div class="modal-head">
        <h2 class="modal-title">🚫 {$t('bans.title')} ({$banned.size})</h2>
        <button class="modal-x" on:click={onClose} aria-label="close">✕</button>
      </div>
      {#if bannedHeroes.length}
        <div class="ban-grid">
          {#each bannedHeroes as hero (hero.key)}
            <button class="ban-card" on:click={() => banned.toggle(hero.key)} title={hero.name}>
              <img
                class="ban-img"
                src={heroImg(hero.key)}
                alt={hero.name}
                loading="lazy"
                on:error={(e) => e.currentTarget.remove()}
              />
              <span class="ban-name">{hero.name}</span>
            </button>
          {/each}
        </div>
        <button class="btn-glass btn-sm" on:click={banned.clear}>
          {$t('bans.clear')}
        </button>
      {:else}
        <p class="ban-empty">{$t('bans.empty')}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 200;
    animation: fadeIn 0.25s ease;
  }

  .modal {
    width: 100%;
    max-width: 640px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 800;
  }

  .modal-x {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.05);
    color: var(--white-dim);
    font-size: 1rem;
    transition: all var(--transition);
  }

  .modal-x:hover {
    color: var(--white);
    border-color: var(--purple-500);
  }

  .ban-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .ban-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border: 1px solid var(--border-glass);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--white);
    font-family: inherit;
    transition: all var(--transition);
  }

  .ban-card:hover {
    border-color: #4ade80;
    box-shadow: 0 0 15px rgba(74, 222, 128, 0.25);
    transform: translateY(-2px);
  }

  .ban-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 6px;
    filter: grayscale(1);
    background: rgba(255, 255, 255, 0.04);
  }

  .ban-name {
    font-size: 0.75rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.3;
  }

  .ban-empty {
    color: var(--white-muted);
    font-size: 0.9rem;
    text-align: center;
    padding: 12px 0;
  }

  .btn-sm {
    padding: 8px 20px;
    font-size: 0.85rem;
    align-self: center;
  }
</style>
