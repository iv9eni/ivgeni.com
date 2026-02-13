<script lang="ts">
    import IconCustomLightbulbOn from '~icons/custom/lightbulb-on';
    import IconCustomLightbulbOff from '~icons/custom/lightbulb-off';

    let isDark = $state(false);

    $effect(() => {
        const stored = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        isDark = stored === 'true' || (stored === null && prefersDark);
    });

    $effect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    });

    const toggleDarkMode = () => {
        isDark = !isDark;
        localStorage.setItem('darkMode', String(isDark));
    };
</script>

<button
    onclick={toggleDarkMode}
    class="fixed top-6 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/80 bg-white/60 text-(--icon-muted) shadow-sm backdrop-blur-sm transition-all duration-600 hover:text-(--accent-blue) hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800/60"
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
    {#if isDark}
        <IconCustomLightbulbOn />
    {:else}
        <IconCustomLightbulbOff />
    {/if}
</button>
