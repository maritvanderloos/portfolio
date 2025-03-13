---
title: Creature
year: 2023
order: 6
---

One of my first programming projects was creating this animal-like creature. It was made in Processing, a Java-based language designed for visual arts and interactive media. I built the creature entirely out of geometric shapes and lines, drawing inspiration from a riso-printed drawing I had made earlier.
<single-image src="_creains.jpg" height="3000" width="500" caption="Reference drawing">

When you click on the wall socket, the creature gets "electrocuted": his whiskers get spikey.

<img id="no-elec" src="creature-1.png" height="500" width="500" caption="Hold your mouse down to electrocute!" >
<img id="elec" src="creature-2.png" height="500" width="500" caption="Release to save him!">

<script>
    const noElec = document.getElementById("no-elec");
    const elec = document.getElementById("elec");

    // Trigger loading for both images
    const noElecImg = noElec.querySelector("img");
    const elecImg = elec.querySelector("img");

    noElecImg.style.pointerEvents = "none";
    elecImg.style.pointerEvents = "none";

    const borderRadius = "14px";
    noElecImg.style.borderRadius = borderRadius;
    elecImg.style.borderRadius = borderRadius;

    // Add Apple-like border smoothing
    noElecImg.style.boxShadow = `0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05)`;
    elecImg.style.boxShadow = `0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.05)`;
    noElecImg.style.webkitMaskImage = "-webkit-radial-gradient(circle, white, black)";
    elecImg.style.webkitMaskImage = "-webkit-radial-gradient(circle, white, black)";

    // Preload images
    noElecImg.src = noElecImg.src;
    elecImg.src = elecImg.src;

    let isElectrocuting = false;

    function setElectrocuting(isElectrocuting) {
        if (isElectrocuting) {
            elec.style.cursor = "grab";
            noElec.style.cursor = "grab";
            elec.style.userSelect = "none";
            noElec.style.userSelect = "none";

            elec.style.display = "block";
            noElec.style.display = "none";
        } else {
            elec.style.cursor = "pointer";
            noElec.style.cursor = "pointer";

            elec.style.userSelect = "none";
            noElec.style.userSelect = "none";

            elec.style.display = "none";
            noElec.style.display = "block";
        }
    }

    setElectrocuting(isElectrocuting);

    ([noElec, elec]).forEach(section => {
        section.addEventListener("mousedown", () => {
            console.log("mousedown");
            isElectrocuting = true;
            setElectrocuting(isElectrocuting);
        });
    });

    window.addEventListener("mouseup", () => {
        console.log("mouseup");
        isElectrocuting = false;
        setElectrocuting(isElectrocuting);
    });
</script>
