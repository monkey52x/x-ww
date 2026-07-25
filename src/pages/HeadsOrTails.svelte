<script>
  import { t } from '../i18n.js'
  import { navigate } from 'svelte-routing'

  let flipping = false
  let result = null

  function flip() {
    if (flipping) return
    flipping = true
    result = null

    setTimeout(() => {
      result = Math.random() < 0.5 ? 'heads' : 'tails'
      flipping = false
    }, 600)
  }

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }
</script>

<div class="page">
  <a href="/fun" class="back-link" on:click={(e) => goTo('/fun', e)}>
    ← {$t('back')}
  </a>
  <h1 class="page-title">{$t('headsOrTails.title')}</h1>
  <p class="page-desc">{$t('headsOrTails.description')}</p>

  <div class="coin-container">
    <div class="coin" class:flipping>
      <div class="coin-inner">
        <div class="coin-face">
          {#if flipping}
            🪙
          {:else if result}
            <img src="/images/Heads_or_tails.png" alt={result} class="coin-img" />
            <span class="coin-label">{$t(`headsOrTails.${result}`)}</span>
          {:else}
            🪙
          {/if}
        </div>
      </div>
    </div>

    <button class="btn-glass" on:click={flip} disabled={flipping}>
      {flipping ? '...' : result ? $t('headsOrTails.retry') : $t('headsOrTails.flip')}
    </button>
  </div>
</div>

<style>
  .coin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding-top: 20px;
  }

  .coin {
    width: 200px;
    height: 200px;
    perspective: 600px;
  }

  .coin-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    box-shadow:
      0 0 40px rgba(245, 158, 11, 0.3),
      inset 0 -4px 12px rgba(0,0,0,0.2),
      inset 0 4px 12px rgba(255,255,255,0.15);
    border: 3px solid #fbbf24;
    transition: transform 0.6s ease;
  }

  .coin.flipping .coin-inner {
    animation: spin 0.6s ease-in-out;
  }

  @keyframes spin {
    0% { transform: rotateY(0deg) scale(1); }
    50% { transform: rotateY(720deg) scale(1.1); }
    100% { transform: rotateY(0deg) scale(1); }
  }

  .coin-img {
    width: 64px;
    height: 64px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
  }

  .coin-label {
    font-size: 1.5rem;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0,0,0,0.4);
  }

  .coin-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 3rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--border-glass);
  }
</style>