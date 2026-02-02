<script lang="ts">
    import IconCustomGithub from '~icons/custom/github';
    import IconCustomLinkedin from '~icons/custom/linkedin';
    import IconCustomEmail from '~icons/custom/email';
    import IconCustomPdf from '~icons/custom/pdf';

    export let name: string;
    export let width: string | number = 16;
    export let height: string | number = 16;
    export let color: string | undefined = undefined;
    export let darkColor: string | undefined = undefined;

    const iconMap: Record<string, any> = {
        github: IconCustomGithub,
        linkedin: IconCustomLinkedin,
        email: IconCustomEmail,
        pdf: IconCustomPdf,
    };

    $: IconComponent = iconMap[name];
</script>

{#if IconComponent}
    <span
        class="icon-wrapper"
        style:--light-color={color}
        style:--dark-color={darkColor}
    >
        <IconComponent {width} {height} />
    </span>
{/if}

<style>
    .icon-wrapper :global(svg) {
        color: var(--light-color);
    }
    :global(.dark) .icon-wrapper :global(svg) {
        color: var(--dark-color, var(--light-color));
    }
</style>
