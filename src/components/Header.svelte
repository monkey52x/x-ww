<script>
  import { navigate, useLocation } from 'svelte-routing'
  import { t } from '../i18n.js'
  import LanguageSwitcher from './LanguageSwitcher.svelte'

  const location = useLocation()

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }
</script>

<header class="header glass">
  <div class="header-inner">
    <a href="/" class="header-logo" on:click={(e) => goTo('/', e)}>
      <span class="logo-x">X</span>
      <span class="logo-emoji">😘</span>
      <span class="logo-ww">WW</span>
    </a>
    <nav class="header-nav">
      <a
        href="/"
        class="nav-link"
        class:active={$location.pathname === '/'}
        on:click={(e) => goTo('/', e)}
      >
        {$t('nav.home')}
      </a>
      <a
        href="/fun"
        class="nav-link"
        class:active={$location.pathname === '/fun'}
        on:click={(e) => goTo('/fun', e)}
      >
        {$t('nav.fun')}
      </a>
    </nav>
    <LanguageSwitcher />
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 1200px;
    z-index: 100;
    padding: 0 24px;
    border-radius: 20px;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    gap: 16px;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 1px;
    flex-shrink: 0;
    text-decoration: none;
  }

  .header-logo :global(.logo-emoji) {
    margin: 0 -3px;
  }

  .logo-x {
    color: #ffffff;
    text-shadow:
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(255, 255, 255, 0.4),
      0 0 60px rgba(255, 255, 255, 0.2);
  }

  .logo-emoji {
    font-size: 1.3rem;
    line-height: 1;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
  }

  .logo-ww {
    background: linear-gradient(135deg, var(--purple-400), var(--pink-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow:
      0 0 10px rgba(124, 58, 237, 0.6),
      0 0 30px rgba(124, 58, 237, 0.3),
      0 0 60px rgba(236, 72, 153, 0.15);
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    padding: 8px 14px;
    border-radius: var(--radius-sm);
    color: var(--white-dim);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all var(--transition);
    white-space: nowrap;
    text-decoration: none;
  }

  .nav-link:hover {
    color: var(--white);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link.active {
    color: var(--white);
    background: rgba(124, 58, 237, 0.2);
    border: 1px solid rgba(124, 58, 237, 0.3);
  }

  @media (max-width: 768px) {
    .header {
      top: 8px;
      width: calc(100% - 16px);
      padding: 0 12px;
      border-radius: 14px;
    }

    .header-inner {
      height: 52px;
      gap: 8px;
    }

    .nav-link {
      padding: 6px 10px;
      font-size: 0.8rem;
    }
  }
</style>