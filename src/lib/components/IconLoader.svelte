<script lang="ts">
    import IconCustomGithub from '~icons/custom/github';
    import IconCustomLinkedin from '~icons/custom/linkedin';
    import IconCustomEmail from '~icons/custom/email';
    import IconCustomPdf from '~icons/custom/pdf';
    import IconCustomExternalLink from '~icons/custom/external-link';

    let {
        name,
        width = 20,
        height = 20,
        color,
        darkColor,
    }: {
        name: string;
        width?: string | number;
        height?: string | number;
        color?: string;
        darkColor?: string;
    } = $props();

    const iconMap: Record<string, typeof IconCustomGithub> = {
        github: IconCustomGithub,
        linkedin: IconCustomLinkedin,
        email: IconCustomEmail,
        pdf: IconCustomPdf,
        'external-link': IconCustomExternalLink,
    };

    let IconComponent = $derived(iconMap[name]);
</script>

{#if IconComponent}
    {#if color}
        <span
            class="has-color"
            style:--light-color={color}
            style:--dark-color={darkColor}
        >
            <IconComponent {width} {height} />
        </span>
    {:else}
        <IconComponent {width} {height} />
    {/if}
{/if}

<style>
    .has-color :global(svg) {
        color: var(--light-color);
    }
    :global(.dark) .has-color :global(svg) {
        color: var(--dark-color, var(--light-color));
    }
</style>
