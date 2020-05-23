<template class="overflow-hidden">
<div :style="`background:url(${imgobj.lq.url});background-size:cover;`" class="aspect-ratio-wide">
  <img draggable="false"
    class="w-full lazyimg lozad"
    :src="imgobj.lq.url"
    :sizes="sizes"
    :data-src="imgobj['360p'].url"
    :data-srcset="getSet(imgobj)"
    :alt="imgobj.alt"
  >
  </div>
</template>
<script>
export default {
  props: ["imgobj", "sizes"],

  computed: {
 aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.imgobj['720p'].dimensions.width || !this.imgobj['720p'].dimensions.height) return null;

      return (this.imgobj['720p'].dimensions.height / this.imgobj['720p'].dimensions.width) * 100;
    },
  },
  methods: {
    getSet(imgobj) {
      let arr = [];
            if (imgobj) {
        arr.push(` ${imgobj.url} ${imgobj.dimensions.width}w`);
      }
            if (imgobj && imgobj["720p"]) {
        arr.push(` ${imgobj["720p"].url} 1280w`);
      }
      if (imgobj && imgobj["360p"]) {
        arr.push(` ${imgobj["360p"].url} 640w`);
      }


      let x = arr.toString();
      return x;
    }
  }
};
</script>
<style>
/* purgecss start ignore */

[class*='ratio-'] {
  display: block;
  position: relative;
}

[class*='ratio-'] > * {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.aspect-ratio-wide {
  padding-top: 56.25%;
}

.aspect-ratio-square {
  padding-top: 100%;
}
img.lazyimg[data-loaded="false"] {
opacity:0;
  transform: translateZ(0);
  transition-delay: 350ms;
  transition: all 400ms, -webkit-filter 400ms;
}
img.lazyimg[lazy="error"] {
  opacity: 1;
  transition: all 0.2s;
}
img.lazyimg[data-loaded="true"] {
  opacity: 1;  transition-delay: 350ms;

    transition: all 400ms, -webkit-filter 400ms;

  transform: translateZ(0);

}
/* purgecss end ignore */

</style>