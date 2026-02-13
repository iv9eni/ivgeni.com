<script lang="ts">
    let {
        company,
        period,
        description,
    }: { company: string; period: string; description: string } = $props();
</script>

<div class="mb-8 last:mb-0">
    <div class="mb-2 flex items-baseline gap-3">
        <span class="text-lg font-semibold text-(--text-primary)"
            >{company}</span
        >
        <span class="text-base text-(--text-secondary)">{period}</span>
    </div>
    <p class="pl-0 text-base leading-relaxed text-(--text-secondary)">
        {description}
    </p>
</div>
