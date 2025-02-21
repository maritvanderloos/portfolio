<script lang="ts">
    import { onMount, tick, type Snippet } from "svelte";

    // @ts-ignore
    import Bricks from "bricks.js";
    import type { ProjectData } from "../lib/getProjects";
    import FullScreenable from "./FullScreenable.svelte";

    // let { images }: { images: ProjectData["images"] } = $props();
    let { children }: { children: Snippet } = $props();

    let wrapper: HTMLElement;

    $effect(() => {
        if (wrapper) {
            // find [data-masonry-item]
            tick().then(() => {
                const items = wrapper.querySelectorAll("[data-masonry-item]");
                console.log("found items", items);
                if (!items)
                    throw new Error("MasonryImageGrid: container not found");

                const container = items[0].parentElement;

                // add resize observer
                const observer = new ResizeObserver(async () => {
                    console.log("resize from observer");
                    await tick();
                    instance.pack();
                });

                Array.from(items).forEach((child) => {
                    console.log("child", child);
                    observer.observe(child);
                });

                const sizes = [
                    { columns: 2, gutter: 10 },
                    { mq: "768px", columns: 2, gutter: 25 },
                    { mq: "1024px", columns: 3, gutter: 20 },
                ];
                const instance = new Bricks({
                    container,
                    packed: "packed",
                    sizes,
                });

                instance.resize(true).pack();
            });
        }
    });
</script>

<div bind:this={wrapper} class="w-full h-full relative">
    {@render children()}
</div>
