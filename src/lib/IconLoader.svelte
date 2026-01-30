<script lang="ts">
    import IconCustomGithub from '~icons/custom/github';
    import IconCustomLinkedin from '~icons/custom/linkedin';
    import IconCustomEmail from '~icons/custom/email';
    import IconCustomDownload from '~icons/custom/download';

    export let name: string;
    export let width: string | number = 16;
    export let height: string | number = 16;

    const iconMap: Record<string, any> = {
        github: IconCustomGithub,
        linkedin: IconCustomLinkedin,
        email: IconCustomEmail,
        download: IconCustomDownload,
    };

    $: IconComponent = iconMap[name];
</script>

{#if IconComponent}
    <IconComponent {width} {height} />
{/if}
