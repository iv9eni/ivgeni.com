<script lang="ts">
    import IconLoader from './IconLoader.svelte';

    let {
        title,
        description,
        tags = [],
        link,
    }: {
        title: string;
        description: string;
        tags?: string[];
        link?: string;
    } = $props();
</script>

<div class="card-glass group p-8">
    <div class="mb-4 flex items-start justify-between">
        <h3
            class="text-2xl font-semibold text-(--text-primary)"
            style="font-family: var(--font-serif)"
        >
            {title}
        </h3>
        {#if link}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open {title} in new tab"
                class="text-(--accent-blue) opacity-60 transition-all group-hover:opacity-100 hover:opacity-70"
            >
                <IconLoader name="external-link" />
            </a>
        {/if}
    </div>
    <p class="mb-6 text-base leading-relaxed text-(--text-secondary)">
        {description}
    </p>
    <div class="flex flex-wrap gap-2">
        {#each tags as tag (tag)}
            <span
                class="rounded-full border border-white/30 bg-white/50 px-4 py-1.5 text-sm text-(--text-secondary) backdrop-blur-sm dark:border-white/20 dark:bg-white/10"
            >
                {tag}
            </span>
        {/each}
    </div>
</div>
