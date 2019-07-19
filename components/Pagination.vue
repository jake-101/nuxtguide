<<template>

    <div class="flex justify-center mt-16">
 <ul class="flex rounded-lg overflow-hidden">
      <li v-if="page.prevPage" class="p-4 bg-white border-r"><n-link :to="prevPage">Back</n-link></li>
      <li class="p-4 bg-white border-r" v-for="(p,i) in page.totalPages"><n-link :to="`page/${i+1}`">{{i+1}}</n-link></li>
           <li v-if="page.nextPage" class="p-4 bg-white cursor-pointer"><n-link :to="`page/${page.page + 1}`">Next</n-link></li>
    </ul>
  </div>
</template>
<<script>
export default {
    props: ["page"],
    methods: {
      prevPage() {
return `page/${page.page - 1}`
      }
    }
}
</script>