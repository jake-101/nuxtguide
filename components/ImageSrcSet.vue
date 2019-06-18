<template class="overflow-hidden">
  <img draggable="false"
    class="w-full lazyimg lozad"
    :src="imgobj.lq.url"
    :sizes="sizes"
    :data-src="imgobj['360p'].url"
    :data-srcset="getSet(imgobj)"
    :alt="imgobj.alt"
  >
</template>
<script>
export default {
  props: ["imgobj", "sizes"],
    mounted () {
    this.$lozad.observe();
  },
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
img.lazyimg[data-loaded="false"] {
opacity:0;
  transform: translateZ(0);
  transition: all 400ms, -webkit-filter 400ms;
}
img.lazyimg[lazy="error"] {
  opacity: 1;
  transition: all 0.2s;
}
img.lazyimg[data-loaded="true"] {
  opacity: 1;
    transition: all 400ms, -webkit-filter 400ms;

  transform: translateZ(0);

}
</style>