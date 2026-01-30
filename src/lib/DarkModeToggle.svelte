<script lang="ts">
    import { onMount } from 'svelte';
    import IconCustomLightbulbOn from '~icons/custom/lightbulb-on';
    import IconCustomLightbulbOff from '~icons/custom/lightbulb-off';

    let isDark = $state(false);

    onMount(() => {
        const stored = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        const shouldBeDark =
            stored === 'true' || (stored === null && prefersDark);
        isDark = shouldBeDark;

        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        }
    });

    const toggleDarkMode = () => {
        isDark = !isDark;
        localStorage.setItem('darkMode', String(isDark));

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
</script>

<button
    onclick={toggleDarkMode}
    class="fixed top-6 right-6 z-50 flex h-8 w-8 items-center justify-center rounded-lg border border-white/80 bg-white/60 text-[#546e7a] shadow-sm backdrop-blur-sm transition-colors duration-600 hover:text-[#5b8def] hover:shadow-md hover:cursor-pointer dark:bg-gray-800/60 dark:border-gray-700/80 dark:hover:text-[#7da3f5]"
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
    {#if isDark}
        <IconCustomLightbulbOn />
    {:else}
        <IconCustomLightbulbOff />
    {/if}
</button>
