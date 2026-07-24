<script>
  const links = [
    { href: 'https://www.youtube.com/@vlogf', icon: '▶️', label: 'YouTube' },
    { href: 'https://t.me/vlogf', icon: '✈️', label: 'Telegram' },
    { href: 'https://www.twitch.tv/vlogf', icon: '📺', label: 'Twitch' },
    { href: 'https://x.com/vlogf', icon: '🐦', label: 'X (Twitter)' },
    { href: 'https://www.donationalerts.com/r/vlogf', icon: '💜', label: 'DonationAlerts' },
  ]
</script>

<div class="bio-page">
  <div class="bio-card glass">
    <div class="bio-avatar">V</div>
    <h1 class="bio-name">vlogf</h1>
    <p class="bio-desc">Streamer, video maker, just a good person</p>
    <div class="bio-links">
      {#each links as { href, icon, label }}
        <a href={href} target="_blank" rel="noopener noreferrer" class="bio-link glass">
          <span class="bio-link-icon">{icon}</span>
          <span class="bio-link-label">{label}</span>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .bio-page {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    min-height: 100vh;
  }

  .bio-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 32px;
    border-radius: 24px;
    max-width: 400px;
    width: 100%;
    gap: 16px;
  }

  .bio-avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple-500), var(--pink-500));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
  }

  .bio-name {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--white);
  }

  .bio-desc {
    font-size: 0.9rem;
    color: var(--white-dim);
    text-align: center;
    margin-bottom: 8px;
  }

  .bio-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .bio-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 14px;
    text-decoration: none;
    color: var(--white);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all var(--transition);
  }

  .bio-link:hover {
    border-color: var(--purple-500);
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
    transform: translateY(-2px);
  }

  .bio-link-icon {
    font-size: 1.3rem;
    width: 32px;
    text-align: center;
    flex-shrink: 0;
  }

  .bio-link-label {
    flex: 1;
  }
</style>