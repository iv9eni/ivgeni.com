<script lang="ts">
    import type { Social } from './types';
    import IconLoader from './IconLoader.svelte';

    export let socials: Social[] = [];
</script>

<div class="fixed top-6 left-6 z-50 flex flex-col gap-3">
    {#each socials as { url, icon, color, darkColor }}
        <a
            href={url}
            target="_blank"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/80 bg-white/60 text-[#546e7a] shadow-sm backdrop-blur-sm transition-colors duration-600 hover:text-[#5b8def] hover:shadow-md dark:bg-gray-800/60 dark:border-gray-700/80 dark:hover:text-[#7da3f5]"
        >
            <IconLoader name={icon} color={color} darkColor={darkColor} />
        </a>
    {/each}
</div>
