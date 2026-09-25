<script>
  import { t, locale } from '../i18n.js'

  export let open = false
  export let onClose = () => {}

  const LANGUAGES = [
    { code: 'ru', label: 'RU' },
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
  ]

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
        <h2 class="modal-title">⚙ {$t('settings.title')}</h2>
        <button class="modal-x" on:click={onClose} aria-label="close">✕</button>
      </div>
      <div class="setting-row">
        <span class="setting-label">🌐 {$t('language')}</span>
        <div class="lang-btns">
          {#each LANGUAGES as { code, label }}
            <button
              class="lang-btn"
              class:active={code === $locale}
              on:click={() => locale.set(code)}
            >
              {label}
            </button>
          {/each}
        </div>
      </div>
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
    max-width: 420px;
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

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .setting-label {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--white);
  }

  .lang-btns {
    display: flex;
    gap: 8px;
  }

  .lang-btn {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.05);
    color: var(--white-dim);
    font-size: 0.85rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition);
  }

  .lang-btn:hover {
    color: var(--white);
    border-color: var(--purple-500);
  }

  .lang-btn.active {
    color: var(--white);
    background: rgba(124, 58, 237, 0.25);
    border-color: var(--purple-500);
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
  }
</style>
