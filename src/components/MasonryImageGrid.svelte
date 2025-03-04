<script lang="ts">
  import { onMount, tick, type Snippet } from "svelte";

  // @ts-ignore
  //   import Bricks from "bricks.js";
  //   import Masonry from "masonry-layout";
  import type { ProjectData } from "../lib/getProjects";
  import FullScreenable from "./FullScreenable.svelte";

  // let { images }: { images: ProjectData["images"] } = $props();
  let {
    children,
    smColumns = undefined,
    mdColumns = undefined,
    lgColumns = undefined,
  }: {
    children: Snippet;
    smColumns?: number;
    mdColumns?: number;
    lgColumns?: number;
  } = $props();

  let wrapper: HTMLElement;

  let packing = $state(false);

  //   $effect(() => {
  //     if (wrapper) {
  //       packing = true;
  //       // find [data-masonry-item]
  //       tick().then(() => {
  //         const items = wrapper.querySelectorAll("[data-masonry-item]");
  //         // console.log("found items", items);
  //         if (!items) throw new Error("MasonryImageGrid: container not found");

  //         const container = items[0].parentElement;

  //         // add resize observer
  //         // const observer = new ResizeObserver(async () => {
  //         //     if (packing) return;
  //         //     console.log("resize from observer");
  //         //     await tick();
  //         //     // requestAnimationFrame(() => {
  //         //     //     instance.pack();
  //         //     // });
  //         // });

  //         Array.from(wrapper.querySelectorAll("img")).forEach((child) => {
  //           console.log("child", child.nodeName);
  //           child.onload = async (data) => {
  //             console.log("child image has been loaded", data);
  //             console.log("child image has been loaded");
  //             await tick();
  //             await new Promise((resolve) => setTimeout(resolve, 1000));
  //             instance.update()
  //           };
  //         });

  //         const sizes = [
  //           { columns: smColumns, gutter: 10 },
  //           { mq: "768px", columns: mdColumns, gutter: 25 },
  //           { mq: "1024px", columns: lgColumns, gutter: 20 },
  //         ];
  //         const instance = new Masonry(container, {
  //           itemSelector: "[data-masonry-item]",
  //           columnWidth: 200,
  //           horizontalOrder: true,
  //         //   fitWidth: true,
  //         //   percentPosition: true,
  //         //   columnWidth: ".grid-sizer",
  //         //   percentPosition: true,
  //           gutter: 10,
  //         });

  //         instance.resize(true).pack();
  //         packing = false;
  //       });
  //     }
  //   });
</script>

<div
  id="masonry-grid"
  class="w-full h-full relative"
  style={`--smColumns: ${smColumns ?? mdColumns ?? lgColumns ?? 2}; --mdColumns: ${mdColumns ?? lgColumns ?? 3}; --lgColumns: ${lgColumns ?? 3};`}
>
  {@render children()}
</div>

<!-- <div bind:this={wrapper} class="w-full h-full relative grid">
  {@render children()}
</div> -->

<style lang="scss">
  #masonry-grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(var(--smColumns), 1fr);
    gap: 1rem;

    :global(img) {
      margin: 0;
    }
  }
  @media (min-width: 768px) {
    #masonry-grid {
      grid-template-columns: repeat(var(--mdColumns), 1fr);
    }
  }
  @media (min-width: 1024px) {
    #masonry-grid {
      grid-template-columns: repeat(var(--lgColumns), 1fr);
    }
  }
</style>
