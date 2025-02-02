<script lang="ts">
    import { onDestroy, onMount, type Snippet } from "svelte";
    import { fade, fly, scale } from "svelte/transition";

    // let {
    //     children,
    //     src,
    // }: {
    //     children: Snippet;
    //     src: ImageMetadata;
    // } = $props();

    let container: HTMLDivElement;
    let isFullScreen = $state(false);
    let zoom = $state(1);
    let zoomOriginX = $state(0);
    let zoomOriginY = $state(0);

    function onClick() {
        console.debug("Full screen clicked");
        isFullScreen = !isFullScreen;
    }

    function onWheel(e: WheelEvent) {
        window?.requestAnimationFrame(() => {
            if (isFullScreen) {
                zoom = Math.max(1, Math.min(3.5, zoom + e.deltaY / 1000));
                console.debug("Zoom", zoom);
            }
        });
    }

    function onMouseMove(e: MouseEvent) {
        window?.requestAnimationFrame(() => {
            if (isFullScreen) {
                zoomOriginX = Math.round((100 * e.clientX) / window.innerWidth);
                zoomOriginY = Math.round(
                    (100 * e.clientY) / window.innerHeight,
                );
                console.debug("Zoom origin", zoomOriginX, zoomOriginY);
            }
        });
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            isFullScreen = false;
        }
    }

    onMount(() => {
        // add scroll listener to zoom in out on scroll
        globalThis?.window?.addEventListener("wheel", onWheel);
        globalThis?.window?.addEventListener("mousemove", onMouseMove);
        globalThis?.window?.addEventListener("keydown", onKeyDown);
    });

    onDestroy(() => {
        globalThis?.window?.removeEventListener("wheel", onWheel);
        globalThis?.window?.removeEventListener("mousemove", onMouseMove);
        globalThis?.window?.removeEventListener("keydown", onKeyDown);
    });
</script>

<div
    bind:this={container}
    onclick={onClick}
    onkeydown={(e) => e.key === "Enter" && onClick()}
    role="button"
    tabindex="0"
    class="cursor-zoom-in"
>
    <slot name="image" />
</div>

{#if isFullScreen}
    <div
        role="button"
        class="fullscreen-container transition-all duration-300 relative"
        class:fullscreen={isFullScreen}
        transition:fade={{ duration: 150 }}
        onclick={() => (isFullScreen = false)}
        tabindex="0"
        onkeydown={(e) => e.key === "Escape" && (isFullScreen = false)}
    >
        <button
            class="top-8 right-8 absolute p-4 bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center z-50 cursor-pointer"
            class:hidden={!isFullScreen}
            onclick={(e) => {
                e.stopPropagation();
                isFullScreen = false;
            }}
        >
            x
        </button>
        <div class="absolute inset-0 flex justify-center items-center">
            <div
                class="w-12 h-12 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"
            ></div>
        </div>
        <div
            class="z-50 transition-all duration-50 cursor-crosshair"
            style="transform: scale({zoom}); transform-origin: {zoomOriginX}% {zoomOriginY}%"
        >
            <slot name="full-screen" />
            {#if zoom == 1}
                <p
                    transition:fly={{ y: 100, duration: 300, delay: 500 }}
                    class="absolute left-0 text-gray-500 text-sm"
                    style="bottom: -50px; left: 50%; transform: translateX(-50%);"
                >
                    You can scroll to zoom in and out
                </p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .fullscreen {
        /* transform-origin: center; */
        position: fixed;
        /* position: fixed; */
        /* pos */
        /* position: sticky; */
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        /* transform: scale(1.5) translate(-50%, -50%); */
        /* transition: all 0.3s ease-in-out; */
    }

    :global(.fullscreen-container img) {
        transition: all 0.3s ease-in-out;
    }

    :global(.fullscreen img) {
        transition: all 0.3s ease-in-out;
        /* height: 80vh; */
        width: auto;
        max-width: 80vw;
        max-height: 80vh;
        object-fit: cover;
    }
</style>
