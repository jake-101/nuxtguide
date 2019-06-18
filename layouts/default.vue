<template>
  <div id="app">
    <no-ssr>
      <Reveal class="sidemenu">
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/" exact>Home</nuxt-link>
        <nuxt-link class="text-brown-700 hover:text-brown-800" to="/modules">Modules</nuxt-link>
                <nuxt-link class="text-brown-700 hover:text-brown-800" to="/templates">Templates</nuxt-link>

      </Reveal>
    </no-ssr>

    <main id="page-wrap" class="antialiased bg-gray-100 font-sans">
      <ul class="flex bg-gray-900 p-4 justify-center">
        <li class="mx-6">
          <nuxt-link class="text-gray-200 hover:text-white text-sm font-light uppercase tracking-widest" to="/">Nuxt Guide</nuxt-link>
        </li>
      </ul>
      <div class="p-4 md:p-8 lg:p-12">
        <nuxt/>
      </div>
    </main>
    <footer class="m-12">
      <ul class="flex justify-around text-gray-700 text-xs font-light">
                    <li class="mx-2">Made with love by Jake101</li>

        <li class="mx-2">© 2019 Nuxt Guide.</li>
                <li class="mx-2">Submit</li>
   <li class="mx-2">About</li>
      <li class="mx-2">Colophon</li>
         <li class="mx-2">Twitter</li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {
  data: function() {
    return {

    };
  }
};
</script>
<style>
</style>

