<script lang="ts">
    import {
        SocialLinks,
        DarkModeToggle,
        ExperienceItem,
        ProjectCard,
    } from '$lib';
    import content from '$lib/data/content.json';
</script>

<div class="min-h-screen transition-colors duration-500">
    <SocialLinks socials={content.social} />
    <DarkModeToggle />
    <div class="mx-auto max-w-4xl px-8 py-24">
        <!-- Header -->
        <header class="mb-24 text-center">
            <h1
                class="mb-6 text-7xl font-semibold tracking-tight text-(--text-primary)"
                style="font-family: var(--font-serif)"
            >
                {content.name}
            </h1>
        </header>

        <!-- Experience Section -->
        <section class="mb-20" aria-labelledby="experience-heading">
            <h2
                id="experience-heading"
                class="mb-10 text-4xl font-semibold text-(--text-primary)"
                style="font-family: var(--font-serif)"
            >
                {content.sections.experience}
            </h2>
            <div class="card-glass p-10">
                {#each content.experience as exp (exp.company)}
                    <ExperienceItem
                        company={exp.company}
                        period={exp.period}
                        description={exp.description}
                    />
                {/each}
            </div>
        </section>

        <!-- Education Section -->
        <section class="mb-20" aria-labelledby="education-heading">
            <h2
                id="education-heading"
                class="mb-10 text-4xl font-semibold text-(--text-primary)"
                style="font-family: var(--font-serif)"
            >
                {content.sections.education}
            </h2>
            <div class="card-glass p-10">
                <p class="text-lg text-(--text-secondary)">
                    {content.education}
                </p>
            </div>
        </section>

        <!-- Project Archive Section -->
        <section class="mb-20" aria-labelledby="projects-heading">
            <h2
                id="projects-heading"
                class="mb-10 text-4xl font-semibold text-(--text-primary)"
                style="font-family: var(--font-serif)"
            >
                {content.sections.projects}
            </h2>
            <div class="grid gap-6">
                {#each content.projects as project (project.title)}
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        link={project.link}
                    />
                {/each}
            </div>
        </section>

        <!-- Footer -->
        <footer
            class="border-t border-white/30 pt-12 text-center text-(--text-secondary) dark:border-white/10"
        >
            <p class="text-sm">
                &copy; 2026 {content.name}. {content.footer}
            </p>
        </footer>
    </div>
</div>
