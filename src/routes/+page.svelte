<script lang="ts">
    import SocialLinks from '$lib/SocialLinks.svelte';
    import DarkModeToggle from '$lib/DarkModeToggle.svelte';
    import content from '$lib/assets/content.json';
</script>

<div class="min-h-screen">
    <SocialLinks socials={content.social} />
    <DarkModeToggle />
    <div class="mx-auto max-w-2xl px-6 py-16">
        <header class="mb-16">
            <h1 class="text-center mb-8 text-5xl text-[--text-primary]">
                {content.name}
            </h1>
        </header>
    </div>
</div>
