<template class="overflow-hidden">
              <img class="w-full lazyimg" :src="imgobj.lq.url" :sizes="sizes" v-lazy="imgobj['720p'].url" :data-srcset="getSet(imgobj)" :alt="imgobj.alt">

</template>
<script>

export default {
  props: ["imgobj","sizes"],
  methods: {
      getSet(imgobj) {
          let arr = []
        if (imgobj && imgobj['360p']) {
arr.push(` ${imgobj['360p'].url} 360w`)
        }
                if (imgobj && imgobj['720p']) {
arr.push(` ${imgobj['720p'].url} 720w`)
        }
                     if (imgobj) {
arr.push(` ${imgobj.url} ${imgobj.dimensions.width}w`)
        }  
        let x = arr.toString();
return x

      }
  }
};
</script>
<style>
img.lazyimg[lazy=loading] {
	-webkit-filter: blur(10px);
        filter: blur(10px);
        transition-delay:400ms;
         transform: translateZ(0);
        max-height: 20vh;
        opacity:0;
		transition: all 400ms, -webkit-filter 400ms;
  }
  img.lazyimg[lazy=error] {
    opacity:1;
    transition: all .2s
  }
  img.lazyimg[lazy=loaded] {
    -webkit-filter: blur(0);
      opacity:1;
     transform: translateZ(0);
		filter: blur(0);
  }
</style>