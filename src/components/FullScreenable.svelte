<script lang="ts">
    import X from "lucide-svelte/icons/x";
    import { onDestroy, onMount, type Snippet } from "svelte";
  import { cubicOut } from "svelte/easing";
    import { fade, fly, scale } from "svelte/transition";

    let container: HTMLDivElement;
    let isFullScreen = $state(false);
    let zoom = $state(1);
    let zoomOriginX = $state(0);
    let zoomOriginY = $state(0);

    function onClick() {
        console.log("_----->> click!")
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

    function onThumbnailLoad() {
    }

    onMount(() => {
        // add scroll listener to zoom in out on scroll
        globalThis?.window?.addEventListener("wheel", onWheel);
        globalThis?.window?.addEventListener("mousemove", onMouseMove);
        globalThis?.window?.addEventListener("keydown", onKeyDown);

    });

    $effect(() => {
        if (container) {
            container.querySelector("img")?.addEventListener("load", onThumbnailLoad);
        }
    })

    onDestroy(() => {
        globalThis?.window?.removeEventListener("wheel", onWheel);
        globalThis?.window?.removeEventListener("mousemove", onMouseMove);
        globalThis?.window?.removeEventListener("keydown", onKeyDown);
        container?.querySelector("img")?.removeEventListener("load", onThumbnailLoad);
    });

    // let thumb: HTMLImageElement;
    // console.log("thumb", thumb);
</script>

<div
    bind:this={container}
    onclick={onClick}
    onkeydown={(e) => e.key === "Enter" && onClick()}
    role="button"
    tabindex="0"
    class="cursor-zoom-in"
>
    <slot name="image"/>
</div>

{#if isFullScreen}
    <div
        role="button"
        class="fullscreen-container transition-all duration-300 relative"
        class:fullscreen={isFullScreen}
        transition:fade={{ duration: 50 }}
        onclick={() => (isFullScreen = false)}
        tabindex="0"
        onkeydown={(e) => e.key === "Escape" && (isFullScreen = false)}
    >
        <button
            transition:fly={{ y: 10, duration: 500, delay: 50, easing: cubicOut }}
            class="top-8 right-8 absolute bg-pink-300 text-pink-900 rounded-full w-10 h-10 flex items-center justify-center z-50 cursor-pointer"
            class:hidden={!isFullScreen}
            onclick={(e) => {
                e.stopPropagation();
                isFullScreen = false;
            }}
        >
            <X size={24} />
        </button>
        <div class="absolute inset-0 flex justify-center items-center">
            <div
                class="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"
            ></div>
        </div>
        <div
            transition:fly={{ y: 20, duration: 100, delay: 0, easing: cubicOut }}
            class="z-50 transition-all duration-50 cursor-crosshair"
            style="transform: scale({zoom}); transform-origin: {zoomOriginX}% {zoomOriginY}%"
        >
            <slot name="full-screen" />
            <!-- {#if zoom == 1 && !loading}
                <p
                    transition:fly={{ y: 100, duration: 300, delay: 50 }}
                    class="absolute left-0 text-gray-400 text-sm"
                    style="bottom: -50px; left: 50%; transform: translateX(-50%);"
                >
                    You can scroll to zoom in and out
                </p>
            {/if} -->
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
