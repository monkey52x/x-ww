<script>
  import { locale } from '../i18n.js'
  import { onMount } from 'svelte'

  const LANGUAGES = [
    { code: 'ru', label: 'RU' },
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
  ]

  let open = false

  $: current = LANGUAGES.find((l) => l.code === $locale) || LANGUAGES[0]

  function handleClick(e) {
    if (open && !e.target.closest('.lang-dropdown')) {
      open = false
    }
  }

  onMount(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  })
</script>

<div class="lang-dropdown">
  <button class="lang-trigger" on:click={() => (open = !open)}>
    {current.label}
    <svg class="lang-arrow" class:open={open} width="10" height="6" viewBox="0 0 10 6">
      <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
    </svg>
  </button>
  {#if open}
    <div class="lang-menu">
      {#each LANGUAGES as { code, label }}
        <button
          class="lang-option"
          class:active={code === $locale}
          on:click={() => {
            locale.set(code)
            open = false
          }}
        >
          {label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .lang-dropdown {
    position: relative;
    flex-shrink: 0;
  }

  .lang-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border: 1px solid var(--border-glass);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: var(--white);
    font-size: 0.85rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition);
  }

  .lang-trigger:hover {
    border-color: var(--purple-500);
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
  }

  .lang-arrow {
    transition: transform 0.25s ease;
    color: var(--white-dim);
  }

  .lang-arrow.open {
    transform: rotate(180deg);
  }

  .lang-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 100%;
    background: rgba(26, 5, 51, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: 10px;
    overflow: hidden;
    z-index: 200;
    animation: menuIn 0.15s ease;
  }

  @keyframes menuIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .lang-option {
    display: block;
    width: 100%;
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: var(--white-dim);
    font-size: 0.85rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }

  .lang-option:hover {
    background: rgba(124, 58, 237, 0.3);
    color: var(--white);
  }

  .lang-option.active {
    color: var(--white);
    background: rgba(124, 58, 237, 0.2);
  }
</style>