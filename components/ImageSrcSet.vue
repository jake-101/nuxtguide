<template>
              <img class="w-full" v-if="imgobj" v-lazy="imgobj['720p'].url" :data-srcset="getSet(imgobj)" :alt="imgobj.alt">

</template>
<script>

export default {
  props: ["imgobj"],
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
