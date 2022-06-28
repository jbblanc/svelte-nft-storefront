<script lang="ts">
	export let label: string;
	export let style: string = "primary";
	export let outline = false;
	export let small = false;
</script>

<button class="btn"
				class:btn-primary={style === "primary"}
				class:btn-secondary={style === "secondary"}
				class:btn-outline={outline}
				class:btn-sm={small}
				on:click>{label}</button>

<!--<button
	{disabled}
	class="rounded-lg py-{ctaLanding ? '3' : '2'} px-{ctaLanding ? '10' : '5'} text-base"
	class:btn-primary={style === "primary" && !disabled}
	class:btn-primary-disabled={style === "primary" && disabled}
	class:btn-primary-outline={style === "primary-outline"}
	class:btn-secondary={style === "secondary"}
	class:btn-tertiary={style === "tertiary"}
	class:btn-tertiary-outline={style === "tertiary-outline"}
	class:w-full={isFullSize}
	class:cursor-default={disabled}
	on:click>
	{label}
</button>-->