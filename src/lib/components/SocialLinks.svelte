<script lang="ts">
    import type { Social } from '$lib/types';
    import IconLoader from './IconLoader.svelte';

    let { socials = [] }: { socials: Social[] } = $props();
</script>

<nav
    aria-label="Social links"
    class="fixed top-6 left-6 z-50 flex flex-col gap-4"
>
    {#each socials as social, i (i)}
        <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/80 bg-white/40 text-(--icon-muted) shadow-sm backdrop-blur-sm transition-all duration-600 hover:text-(--accent-blue) hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800/40"
        >
            <IconLoader
                name={social.icon}
                color={social.color}
                darkColor={social.darkColor}
            />
        </a>
    {/each}
</nav>
