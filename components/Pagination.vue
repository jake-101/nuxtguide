<<template>

    <div class="flex justify-center mt-16">
 <ul class="flex rounded-lg overflow-hidden">
      <li v-if="page.prevPage" class="bg-gray-200  border-r"><n-link class="bg-white p-4 block text-gray-700 hover:text-gray-800" :to="prevPage()">Back</n-link></li>
      <li class="bg-gray-200 border-r" :class="{'nuxt-link-exact-active': isRoot(i)}" v-for="(p,i) in page.totalPages"><n-link class="bg-white  p-4 block text-gray-700 hover:text-gray-800" :to="`/page/${i+1}`">{{i+1}}</n-link></li>
           <li v-if="page.nextPage" class="bg-gray-200 cursor-pointer "><n-link class="bg-white  p-4 block text-gray-700 hover:text-gray-800" :to="`/page/${page.page + 1}`">Next</n-link></li>
    </ul>
  </div>
</template>
<<script>
export default {
    props: ["page"],
    methods: {
      isRoot(i) {
if (this.$route.params.page === !1 && i === 1) {
  return true
}
      },
      prevPage() {
if (this.page.page - 1 === 1) {
  return `/`
}

return `/page/${this.page.page - 1}`
      }
    }
}
</script>
<style scoped>
.nuxt-link-exact-active {font-weight: 800;pointer-events: none !important;opacity:.8;}
.nuxt-link-exact-active:hover {color:#74948A !important;}
</style>